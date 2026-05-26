const fs = require('fs');
let code = fs.readFileSync('src/screens-dashboard.jsx', 'utf8');

// Replace API_BASE
code = code.replace(
  'const API_BASE = "https://onroutemx.com/wp-json/holybakery/v1";',
  'const API_BASE = "https://onroutemx.com/wp-json/hb/v1";'
);

// Replace useApi
code = code.replace(
  /const useApi = [\s\S]*?return { data, setData, loading, error };\n};/,
  `const useApi = (endpoint, defaultData = null, pollInterval = null) => {
  const [data, setData] = useStateD(defaultData);
  const [loading, setLoading] = useStateD(true);
  const [error, setError] = useStateD(null);

  React.useEffect(() => {
    let isMounted = true;
    const fetchApi = async () => {
      try {
        const token = sessionStorage.getItem("wp_token") || sessionStorage.getItem("wp_token_admin");
        const res = await fetch(\`\${API_BASE}\${endpoint}\`, {
          headers: { "Authorization": token ? \`Bearer \${token}\` : "" }
        });
        if (!res.ok) throw new Error("API Error");
        const json = await res.json();
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (e) {
        // keep old data on error, or if no data show error
        if (isMounted && (!data || !data.items)) setError(e.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    fetchApi();
    
    let intervalId;
    if (pollInterval) {
      intervalId = setInterval(fetchApi, pollInterval);
    }
    
    return () => { 
      isMounted = false; 
      if (intervalId) clearInterval(intervalId);
    };
  }, [endpoint, pollInterval]);

  return { data, setData, loading, error };
};`
);

fs.writeFileSync('src/screens-dashboard.jsx', code);
