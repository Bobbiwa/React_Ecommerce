import React, { useMemo, forwardRef, useRef } from 'react'
import { Button } from 'antd'
import Crud from './Crud'
import { getList, add, update } from './product-category-api'
import { pageSize } from './config'

const MyCrud = forwardRef(Crud)
export default function Demo2() {
  const ref = useRef()
  const columns = useMemo(() => [
    {
      title: '分类名称',
      dataIndex: 'name'
    }
  ])
  // 修改过
  const operationColumns = [
    {
      title: 'Operation',
      key: 'operation',
      render: (e) => (<Button type='link' onClick={() => { ref.current.handleShowUpdate(e) }}>Update category</Button>),
      width: '25%',
      align: 'center'
    }
  ]

  return (
    <MyCrud
      columns={columns}
      operationColumns={operationColumns}
      pageSize={pageSize}
      apiOperations={{
        getList,
        add,
        update
      }}
      ref={ref}
    />
  )
}
