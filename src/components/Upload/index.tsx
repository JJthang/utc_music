import React from 'react'

type Props = {
    name: string
}

const UploadFile = ({ name }: Props) => {
    return (
        <div>UploadFile name:   {name}</div>
    )
}

export default UploadFile