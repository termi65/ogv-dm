import React, { useEffect, useState } from "react";
import supabase from "../subabase";
const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data?.user);
        };
        
        checkUser();
        
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => authListener?.subscription.unsubscribe();
    }, []);
    return (
        <div className="d-flex flex-column  align-items-center mt-3">
            <h1><i className="bi bi-file-person"></i> <span className="text-decoration-underline">OGV-DM</span> <i className="bi bi-pencil-square"></i></h1>
            <h2 className="text-center">Willkommen zum OGV-DM (Deckelmanager vom OGV)</h2>
            <div><p className="text-decoration-underline">{user ? `angemeldet als ${user.identities[0].email}` : 'Gast'}</p></div>
            <section>Mit dieser App kannst du schnell neue Mitglieder und Getränke anlegen und den Deckel jedes Mitglieds einsehen.</section>
            <h3>ACHTUNG</h3>
            <section>
                Beim Bezahlen wird der 'Deckel' gelöscht! Er kann nicht wieder hergestellt werden. Aber keine Angst vor jedem Löschvorgang gibt's eine Sicherheitsabfrage!
            </section>
        </div>
    );
}

export default Home;