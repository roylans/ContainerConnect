import { supabaseServer } from '../../lib/supabase-server'
import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async () => {
  try {
    // Get total registrations count
    const { count, error } = await supabaseServer
      .from('registrations')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Supabase error:', error)
      return new Response(JSON.stringify({ 
        error: 'Failed to fetch stats' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ 
      totalRegistrations: count || 0,
      lastUpdated: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Stats API error:', error)
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}