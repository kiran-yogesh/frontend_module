import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <>
    <div class="errorSection">
        <Link to="/">
          <p>go back</p>
        </Link>
      <h2>404</h2>
      <div>page not found</div>
    </div>
    </>
  )
}

export default Notfound
