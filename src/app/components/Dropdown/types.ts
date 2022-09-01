export interface MyDropdownItem {
    id: string,
    name: string
}

export interface MyDropdownProps {
    data: MyDropdownItem[],
    label: string,
    autoClose?: boolean | 'outside' | 'inside';    
}