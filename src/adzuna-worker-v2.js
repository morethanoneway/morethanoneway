const CAREER_SEARCHES = [
  { key: 'ux-researcher', query: 'UX Researcher' },
  { key: 'hr-specialist', query: 'HR Specialist' },
  { key: 'market-research-analyst', query: 'Market Research Analyst' },
  { key: 'training-development', query: 'Training Development Specialist' },
  { key: 'behavioral-health-technician', query: 'Behavioral Health Technician' },
  { key: 'case-manager', query: 'Case Manager' },
  { key: 'operations-analyst', query: 'Operations Analyst' },
  { key: 'business-analyst', query: 'Business Analyst' },
  { key: 'financial-analyst', query: 'Financial Analyst' },
  { key: 'supply-chain-analyst', query: 'Supply Chain Analyst' },
  { key: 'sales-development-rep', query: 'Sales Development Representative' },
  { key: 'clinical-research-coordinator', query: 'Clinical Research Coordinator' },
  { key: 'medical-writer', query: 'Medical Writer' },
  { key: 'regulatory-affairs', query: 'Regulatory Affairs Specialist' },
  { key: 'healthcare-data-analyst', query: 'Healthcare Data Analyst' },
  { key: 'pharmaceutical-sales', query: 'Pharmaceutical Sales Representative' },
  { key: 'lab-technician', query: 'Laboratory Technician' },
  { key: 'data-analyst', query: 'Data Analyst' },
  { key: 'product-manager', query: 'Product Manager' },
  { key: 'technical-writer', query: 'Technical Writer' },
  { key: 'software-engineer', query: 'Software Engineer' },
  { key: 'cybersecurity-analyst', query: 'Cybersecurity Analyst' },
  { key: 'corporate-communications', query: 'Corporate Communications Specialist' },
  { key: 'public-relations', query: 'Public Relations Specialist' },
  { key: 'social-media-manager', query: 'Social Media Manager' },
  { key: 'content-marketing', query: 'Content Marketing Specialist' },
  { key: 'digital-marketing', query: 'Digital Marketing Specialist' },
  { key: 'ux-writer', query: 'UX Writer' },
  { key: 'content-strategist', query: 'Content Strategist' },
  { key: 'grant-writer', query: 'Grant Writer' },
  { key: 'actuary', query: 'Actuarial Analyst' },
  { key: 'operations-research', query: 'Operations Research Analyst' },
  { key: 'data-scientist', query: 'Data Scientist' },
  { key: 'quantitative-analyst', query: 'Quantitative Analyst' },
  { key: 'sales-operations', query: 'Sales Operations Analyst' },
  { key: 'customer-success', query: 'Customer Success Manager' },
  { key: 'product-marketing', query: 'Product Marketing Manager' },
  { key: 'corporate-trainer', query: 'Corporate Trainer' },
  { key: 'instructional-designer', query: 'Instructional Designer' },
  { key: 'compliance-officer', query: 'Compliance Officer' },
  { key: 'corporate-security', query: 'Corporate Security Analyst' },
  { key: 'policy-analyst', query: 'Policy Analyst' },
  { key: 'government-relations', query: 'Government Relations Specialist' },
];

async function fetchJobCount(appId, appKey, query) {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${appId}&app_key=${appKey}&what=${encodedQuery}&results_per_page=1&content-type=application/json`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    return data.count || 0;
  } catch (e) {
    return null;
  }
}

async function updateJobCounts(env) {
  const appId = env.ADZUNA_APP_ID;
  const appKey = env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    throw new Error('Missing Adzuna credentials');
  }

  const results = {};
  const today = new Date().toISOString().split('T')[0];

  for (const career of CAREER_SEARCHES) {
    const count = await fetchJobCount(appId, appKey, career.query);
    if (count !== null) {
      results[career.key] = count;
    }
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  await env.ADZUNA_JOBS.put('job_counts', JSON.stringify({
    updated: today,
    counts: results
  }));

  return { updated: today, total: Object.keys(results).length };
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(updateJobCounts(env));
  },

  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/trigger') {
      try {
        const result = await updateJobCounts(env);
        return new Response(JSON.stringify({ success: true, ...result }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    if (url.pathname === '/data') {
      const data = await env.ADZUNA_JOBS.get('job_counts');
      return new Response(data || '{}', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://morethanoneway.org'
        }
      });
    }

    return new Response('Adzuna Jobs Updater running', { status: 200 });
  }
};
