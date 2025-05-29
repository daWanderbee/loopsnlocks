export async function checkLoggedIn() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/whoami/`, {
            credentials: "include",
        });


        if (res.status === 200) {
            const data = await res.json();
            return data;
        } else {
            return { is_authenticated: false };
        }
    } catch (error) {
        console.error("❌ checkLoggedIn error:", error);
        return { is_authenticated: false };
    }
}
