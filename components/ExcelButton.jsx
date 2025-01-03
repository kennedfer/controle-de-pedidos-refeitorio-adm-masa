import { FloatButton } from 'antd';
import {FileExcelOutlined} from '@ant-design/icons'

export function ExcelButton({handler}){
    return <FloatButton 
    className='color-green-500 bg-green-500 scale-110'
    shape="square"
    tooltip={<div>Exportar como planilha</div>}
    icon={<FileExcelOutlined/>}
    style={{
      insetInlineEnd: 38,
    }}
    onClick={handler} />
}