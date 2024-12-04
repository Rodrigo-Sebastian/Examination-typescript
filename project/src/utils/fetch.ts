// src/utils/fetch.ts

export const fetchApi = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const apiKey = 'yum-BHRyCR5Lgznl28Tr'; // API-nyckeln som du får vid POST /keys
  
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'x-zocom': apiKey,
        ...(options.headers || {}),
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }
  
    return await response.json();
  };
  