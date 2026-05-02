import { useEffect } from "react";
import { createContext, useContext, useState, type ReactNode } from "react";
import { getHospitais, type HospitalBackend } from "../Services/HospitalService";
import { COORDENADAS_HOSPITAL } from "../config/localizacoes";

interface HospitalContextType {
    hospitais: any[];
    carregando: boolean;
    pesquisar: (termo: string) => Promise<void>;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const HospitalProvider = ({ children }: { children: ReactNode }) => {
    const [hospitais, setHospitais] = useState<any[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);

    //implementando a lógica de pesquisa
    const pesquisar = async (termo: string) => {
        setCarregando(true);
    }

    useEffect(() => {
        const sync = async () => {
            try {
                const data = await getHospitais();

                const mapped = data.map((h: HospitalBackend) => {

                    const chaveHospital = h.nome ? h.nome.toUpperCase() : "DESCONHECIDO" 

                    return{

                            
                        id: h.id,
                        name: h.nome,
                        coords: (h.latitude !== 0 && h.longitude !== 0) 
                        ? [h.latitude, h.longitude]
                        : (COORDENADAS_HOSPITAL as any)[chaveHospital] || [-23.5505, -46.6333]
                    }
                });

                setHospitais(mapped);
            }
            catch (err) {
                console.error("Sincronização falhou", err);
            } finally {
                setCarregando(false)
            }
        };
        sync();
    }, []);

    return (
        <HospitalContext.Provider value={{ hospitais, carregando }}>
            {children}
        </HospitalContext.Provider>
    )
}
export const useHospital = () => {
    const context = useContext(HospitalContext);
    if (!context) throw new Error("useHospital deve ser usado dentro de um HospitalProvider");
    return context;
}

