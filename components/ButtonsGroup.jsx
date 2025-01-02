import {Button} from 'antd'

export function ButtonsGroup({labels, selectButton, selected}){
    return <>
        {
            labels.map(label => <Button type={selected==label && "primary"} onClick={() => selectButton(label)}>{label}</Button>)
        }
    </>
}