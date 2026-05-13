import { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime"

interface RowProps {
    children: ReactNode;
    isHighlighted?: boolean;
}

interface RowListProps {
    rowIds: string[]; //row ids é um array de strings 
    renderRow: (rowId: string, index: number) => ReactNode; 
}

export function RowList({ rowIds, renderRow}: RowListProps) {
    return(
        <div className="RowList">
            <h1 className="RowListHeader">
                Total rows: {rowIds.length}
            </h1>
            {rowIds.map((rowId, index) => 
                <Fragment key={rowId}>
                    {renderRow(rowId, index)}
                </Fragment>
            )}
        </div>
    )
}

export function Row({children, isHighlighted}: RowProps) {
    const classNames = ['Row', isHighlighted ? 'RowHighleted' : ''].join('')
    return (
        <div className={classNames}>
            {children}
        </div>
    )
}