import { WarningOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const icons = {
    'Aprovados': <CheckCircleOutlined />,
    'Pendentes': <WarningOutlined />,
    'Reprovados': <CloseCircleOutlined />
}

const classes = {
    'Aprovados': 'bg-green-400',
    'Pendentes': 'bg-amber-300',
    'Reprovados': 'bg-red-400'
}

export function ButtonsGroup({ labels, selectButton, selected }) {
    return <>
        {
            labels.map(label => <Button className={classes[label]} size='small' disabled={selected == label} onClick={() => selectButton(label)}>
                {icons[label]}
                {label}
            </Button>)
        }
    </>
}