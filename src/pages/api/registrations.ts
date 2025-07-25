import { supabaseServer } from '../../lib/supabase-server'
import type { APIRoute } from 'astro'
import type { RegistrationInsert } from '../../types/supabase'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json()
    
    // Validate required fields
    const { 
      email, 
      name, 
      phone, 
      company, 
      location, 
      container_type, 
      estimated_quantity, 
      notes 
    } = data
    
    if (!email || !name) {
      return new Response(JSON.stringify({ 
        error: 'Email and name are required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid email format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Insert into Supabase using service role
    const { data: registration, error } = await supabaseServer
      .from('registrations')
      .insert([{
        email: email.toLowerCase().trim(),
        name: name.trim(),
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        location: location?.trim() || null,
        container_type: container_type || null,
        estimated_quantity: estimated_quantity ? parseInt(estimated_quantity) : null,
        notes: notes?.trim() || null
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      
      // Handle unique constraint violation (duplicate email)
      if (error.code === '23505') {
        return new Response(JSON.stringify({ 
          error: 'Email already registered' 
        }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        })
      }
      
      return new Response(JSON.stringify({ 
        error: 'Failed to save registration' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Registration saved successfully',
      data: registration 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Registration API error:', error)
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// GET endpoint to retrieve registrations (admin use)
export const GET: APIRoute = async ({ url }) => {
  try {
    const searchParams = new URL(url).searchParams
    const limit = parseInt(searchParams.get('limit') || '50') || 50
    const offset = parseInt(searchParams.get('offset') || '0') || 0

    const { data: registrations, error, count } = await supabaseServer
      .from('registrations')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Supabase error:', error)
      return new Response(JSON.stringify({ 
        error: 'Failed to fetch registrations' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ 
      data: registrations,
      total: count,
      limit,
      offset
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Get registrations API error:', error)
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}