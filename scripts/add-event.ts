import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function addEvent() {
  const { data, error } = await supabase
    .from('events')
    .insert([
      {
        title: 'Biodata Analysis Bootcamp',
        description: 'FREE virtual training on Biodata Analysis organized by Omics Hub and CSIR-CRI (Molecular Lab). Learn R for data analysis, Python for data analysis, Genotyping analysis, Microbiome Analysis, and Google Workspace. Training runs from 12th-29th January 2026. Application deadline: 5th January 2026. Females are highly encouraged to apply. Apply at: https://bit.ly/BIODATA2026',
        event_date: new Date('2026-01-12').toISOString(),
        event_type: 'Training',
        location: 'Virtual'
      }
    ])

  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Event added:', data)
  }
}

addEvent()
