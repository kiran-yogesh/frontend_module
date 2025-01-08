import React from 'react'

const Sidebar = ({showFirmhandle,showProducthandle,showallProductshandle}) => {
  console.log(showProducthandle)
  return (
    <div className="sidebars">
        <ul>
            <li onClick={showFirmhandle}>Add firm</li>
            <li onClick={showProducthandle}>Add product</li>
            <li onClick={showallProductshandle}>All products</li>
            <li>User Auth</li>
        </ul>
    </div>
  )
}

export default Sidebar
