const getAuthToken = (): string | null => {
    // Verifica se o código está rodando no navegador antes de acessar o localStorage
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
};

const api = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = getAuthToken();

    const headers = new Headers(options.headers || {});

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    // Garante que o Content-Type seja definido se houver um corpo
    if (options.body) {
        headers.set('Content-Type', 'application/json');
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    const response = await fetch(url, config);

    // Se a resposta for 401 ou 403, o token pode ser inválido/expirado.
    // Limpamos o token e redirecionamos para o login.
    if ((response.status === 401 || response.status === 403) && typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        window.location.href = '/login'; 
    }

    return response;
};

export default api;