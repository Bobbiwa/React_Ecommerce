import React from 'react'
import './table.less'

export default function Table({ dataSource }) {
  return (
    <table className='category-table'>
      <thead className='category-thead'>
        <tr>
          <th className='category-th' scope="col">Category name</th>
          <th className='category-th tr-right' scope="col">Operation</th>
        </tr>
      </thead>
      <tbody className='category-tbody'>
        {dataSource.map((item) => {
          return (
            <tr key={item.key}>
              <td className='category-td'>{item.categoryName}</td>
              <td className='category-td tr-right'>{item.operation}</td>
            </tr>
          )
        })}
      </tbody>
    </table>

  )
}
