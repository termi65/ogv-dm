import React from "react";

const Home = () => {

    return (
        <div className="d-flex flex-column  align-items-center">
            <h1>OGV-DM <i class="bi bi-file-person"></i> <i class="bi bi-pencil-square"></i></h1>
            <h2>Willkommen zum OGV-DM (Deckelmanager vom OGV)</h2>
            <section>Mit dieser App kannst du schnell neue Mitglieder und Getränke anlegen und den Deckel jedes Mitglieds einsehen.</section>
            <h3>ACHTUNG</h3>
            <section>
                Beim Bezahlen wird der 'Deckel' gelöscht! Er kann nicht wieder hergestellt werden. Aber keine Angst vor jedem Löschvorgang gibt's eine Sicherheitsabfrage!
            </section>
        </div>
    );
}

export default Home;