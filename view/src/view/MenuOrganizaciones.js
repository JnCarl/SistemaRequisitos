import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/stylesMenuOrganizaciones.css';

const MenuOrganizaciones = () => {
    const [mainOrganization, setMainOrganization] = useState(null);
    const [organizations, setOrganizations] = useState([]); 
    const [error, setError] = useState(null);

    //Estado para los parámetros de búsqueda
    const [searchNombre, setSearchNombre] = useState();
    const [searchYear, setSearchYear] = useState();
    const [searchMonth, setSearchMonth] = useState();

    useEffect(() => {
        // Función para obtener la organización principal
        const fetchMainOrganization = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/organizations/principal');
                setMainOrganization(response.data);// Establecer los datos de la organización principal en el estado
            } catch (err) {
                setError(err.response ? err.response.data.error : 'Error al obtener la organización principal');
            }
        };
        //Obtener o listar todas las organizaciones
        const fetchOrganizations = async () => {
            try{
                const response = await axios.get('http://localhost:5000/api/organizations');
                setOrganizations(response.data);// Establecer los datos de las organizaciones en el estado
            }catch(err){
                setError(err.response ? err.response.data.error : 'Error al obtener las organizaciones');
            }
        };

        fetchMainOrganization();
        fetchOrganizations();
    }, []);

    //Función para buscar organizaciones
    const handleSearch = async () => {
        try{
            const response = await axios.get('http://localhost:5000/api/organizations/search', {
                params: {
                    nombre: searchNombre,
                    year: searchYear,
                    month: searchMonth
                }
            });
            setOrganizations(response.data);// actualizar los datos de busqueda 
        }catch(err){
            setError(err.response ? err.response.data.error : 'Error al buscar organizaciones');
        }
    };

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
                            <input 
                            className="textBuscar" 
                            type="text" 
                            placeholder="Buscar por nombre" 
                            value={searchNombre}
                            onChange={(e) => setSearchNombre(e.target.value)}
                            />
                            <button className="search-button" onClick={handleSearch}>Buscar</button>
                        </div>

                        <div className="search-section-bar">
                            <button className="register-button">Registrar Organización</button>
                            <div className="searchbar">
                                <select 
                                className="year-input"
                                value={searchYear}
                                onChange={(e) => setSearchYear(e.target.value)}
                                >
                                <option value="">AÑO</option>
                                <option value="2021">2021</option>
                                <option value ="2022">2022</option>
                                <option value ="2023">2023</option>
                                <option value ="2024">2024</option>
                                {/* <option>2025</option>  mas años*/}
                                </select>
                                <select 
                                className="month-input"
                                value={searchMonth}
                                onChange={(e) => setSearchMonth(e.target.value)}
                                >
                                <option value="">MES</option>
                                <option value="01">Enero</option>
                                <option value="02">Febrero</option>
                                <option value="03">Marzo</option>
                                </select>
                            </div>
                        </div>
                        {error ? (
                            <p>{error}</p>
                        ) : (
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
                                {organizations.map((org) =>(
                                <tr key={org.orgcod}>
                                    <td>{org.orgcod}</td>
                                    <td>{org.orgnom}</td>
                                    <td>{org.orgfeccrea}</td>
                                    <td>{org.orgver}</td>
                                    <td>
                                        <button>Editar</button>
                                        <button>Eliminar</button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        )}
                        <h4>Total de registros {organizations.length}</h4>
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
