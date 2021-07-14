import { ColumnGroup } from 'primereact/columngroup';
import {Column} from 'primereact/column';
import { Row as R } from 'primereact/row';

const HeaderGroup =     
        <ColumnGroup>
            <R>
                <Column header="ID" sortable field="" />
                <Column header="Date" sortable field="" />
                <Column header="Reporter" sortable field="" />
            </R>
        </ColumnGroup>;
    


export default HeaderGroup