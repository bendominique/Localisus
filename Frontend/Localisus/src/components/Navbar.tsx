import { ReactNode, useState } from 'react'

interface NavbarProps {
    children: ReactNode;
    nome: string;
}

interface NavbarListaProps {
    elementosIds: string[];
    renderElemento: (elementoId: string, index: number) => ReactNode;
}

export default function Navbar({ }) {
    return(
        <>
        </>
    )
}


export function NavbarProps({children, nome}: NavbarProps) {
    const nomeClasses = ['']

}