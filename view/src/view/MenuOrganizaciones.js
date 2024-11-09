import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/stylesMenuOrganizaciones.css';

const MenuOrganizaciones = () => {
    const [mainOrganization, setMainOrganization] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Función para obtener la organización principal
        const fetchMainOrganization = async () => {
            try {
                // Usar axios para hacer la solicitud GET
                const response = await axios.get('http://localhost:5000/api/organizations/principal');
                
                // Establecer los datos de la organización principal en el estado
                setMainOrganization(response.data);
            } catch (err) {
                // Manejar el error y actualizar el estado de error
                setError(err.response ? err.response.data.error : 'Error al obtener la organización principal');
            }
        };

        fetchMainOrganization();
    }, []);

    return (
        <div className="menu-container">
            <header className="menu-header">
                <h1>ReqWizards App</h1>
                <span>Menú Principal /</span>
            </header>

            <div className="menusub-container">
                <aside className="sidebar">
                    <div className="bar-menu">
                        <p>MENU PRINCIPAL</p>
                    </div>
                    <div className="profile-section">
                        <div className="profile-icon">👤</div>
                        <p>Nombre Autor - Cod</p>
                        <button className="logout-button">Cerrar Sesión</button>
                    </div>
                </aside>

                <main className="main-content">
                    <h2>MENÚ PRINCIPAL - EMPRESAS</h2>
                    <section className="organization-section">
                        <h3>Organización Principal</h3>
                        {error ? (
                            <p>{error}</p>
                        ) : mainOrganization ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Fecha creación</th>
                                        <th>Versión</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{mainOrganization.orgcod}</td>
                                        <td>{mainOrganization.orgnom}</td>
                                        <td>{mainOrganization.orgfeccrea}</td>
                                        <td>{mainOrganization.orgver}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </section>
                        <section className="organizations-section">
                            <h3>Organizaciones</h3>

                        <div className="sectionTextBuscar">
                            <input className="textBuscar" type="text" placeholder="Buscar" />
                            <button className="search-button">Buscar</button>
                        </div>


                        <div className="search-section-bar">
                            <button className="register-button">Registrar Organización</button>
                            <div className="searchbar">
                                <select className="year-input"><option>AÑO</option></select>
                                <select className="month-input"><option>MES</option></select>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Fecha creación</th>
                                    <th>Versión</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ORG-0002</td>
                                    <td>Mocar Company</td>
                                    <td>23/10/2023</td>
                                    <td>00.01</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>ORG-0003</td>
                                    <td>PetShop Veterinaria</td>
                                    <td>10/05/2023</td>
                                    <td>00.01</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <h4>Total de registros 2</h4>
                        <div className="export-buttons">
                            <button className="export-button">Excel</button>
                            <button className="export-button">PDF</button>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
};

export default MenuOrganizaciones;
