export default {
    register: async (context, payload) => {
        await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
            }),
        }).then(res => res).then(async res => {
            if (res.ok) {
                await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: payload.email,
                        password: payload.password,
                    }),
                }).then(response => {
                    const token = response.headers.get('auth-token');
                    localStorage.setItem("token", token);
                    context.commit('setToken', {token: token});
                });
            }
        });
    },
    login: (context, payload) => {
        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
            }),
        }).then(res => res).then(res => {
            if (res.ok) {
                const token = res.headers.get('auth-token');
                localStorage.setItem("token", token);
            }
        });
    },
    tryLogin: (context) => {
        const token = localStorage.getItem("token");
        if (token) {
            context.commit('setToken', {token: token});
        }
    }
}