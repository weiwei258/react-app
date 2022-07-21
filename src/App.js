
import data from './data.json'
import './App.css';
import { Col, Row, Radio, Card, Table } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { useState } from 'react'
import logo from './image.jpg'
const { Column } = Table;

function App() {
  const [type, setType] = useState('card')
  const layoutProps = {
    xxl: 6,
    xl: 8,
    lg: 12,
    span: 12
  }
  const onChange = (e) => {
    setType(e.target.value)
  }

  return (
    <div className="App">
      <Card className='card' bordered={true}>
        <Row justify="end">
          <Col span={6} style={{ display: 'flex', 'justify-content': 'end' }}>
            <Radio.Group defaultValue="card" onChange={onChange}>
              <Radio.Button value="card">卡片</Radio.Button>
              <Radio.Button value="table">列表</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        {
          type === 'card' &&
          <Row gutter={30}>
            {
              data.map(item => {
                return (
                  <Col {...layoutProps} key={item.guid}>
                    <div className="card-item">
                      <img className="image" src={logo} />
                      <div className="main">
                        <div className="title">{item.productCategory}</div>
                        <div className="manager">项目经理：{item.prjManager}</div>
                        <div className="start-time">立项日期：{item.prjStartDate.split(' ')[0]}</div>
                        <div className="task">任务：{item.taskCount || 0} 完成：{item.taskDoneCount || 0} 进行：{item.taskDoingCount || 0}</div>
                      </div>
                      <div className="status">
                        <div className={item.projectStatus === 'processing' ? 'task-status' : 'task-status approving'}>
                          {item.projectStatus === 'processing' ? '进行中' : '审批中'}
                        </div>
                        <StarFilled className="is-liked" />
                      </div>
                    </div>
                  </Col>
                )
              })
            }
          </Row>
        }
        {
          type === 'table' && (
            <Table dataSource={data} pagination={false} rowClassName={(_, index) => (index % 2 === 0 && 'background-gray')}>
              <Column render={() => <StarFilled className="table-liked" />} width={50} />
              <Column title="所属品类" dataIndex="productCategory" key="productCategory" width={100} />
              <Column title="项目类别" dataIndex="prjCategory" key="prjCategory" width={200} />
              <Column title="项目编号" dataIndex="guid" key="guid" />
              <Column title="项目名称" dataIndex="prjName" key="prjName" width={150} />
              <Column title="项目状态" dataIndex="projectStatus" key="projectStatus" width={100}
                render={(projectStatus) => (
                  <div className={projectStatus === 'processing' ? 'task-status' : 'task-status approving'}>
                    {projectStatus === 'processing' ? '进行中' : '审批中'}
                  </div>
                )}
              />
              <Column title="项目经理" dataIndex="prjManager" key="prjManager" width={100} />
              <Column title="所属部门" dataIndex="department" key="department" width={100} />
              <Column title="项目计划时间" dataIndex="prjStartDate" key="prjStartDate" width={200}
                render={(_, record) => (
                  record.prjStartDate.split(' ')[0] + '~' + record.prjEndDate.split(' ')[0]
                )}
              />
            </Table>
          )
        }

      </Card>
    </div>
  );
}

export default App;
