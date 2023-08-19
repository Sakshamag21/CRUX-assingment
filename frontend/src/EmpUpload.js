import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Input,Button, Table,Modal,Row,Col,Alert} from 'antd';
import { Space, Typography } from 'antd';
import ChatInterface from './chatinterface';

const { Text, Link } = Typography;
const EmpUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [askedQuestion, setAskedQuestion] = useState('');
  const [tabledata,setTableData]=useState([]);
  const [columndata,setCoulumndata]= useState([]);
  // const [askedQuestionArray,setAskedQuestionArray]=useState()
  const [questionansmap,setquestionansmap]=useState({})
  const [askedAnswer,setAskedAnswer]=useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[fileupload,setFileUpload]=useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        const lines = contents.split('\n');
        const csvData = [];

        for (let line of lines) {
          const values = line.split(',');
          csvData.push(values);
        }

        // console.log(csvData,'csvdata');
        const columnNames = csvData[0];
        let columnMapArray=[]
        for (let i = 0; i < columnNames.length; i++) {
          const columnMap = {
            title: columnNames[i],
            dataIndex: columnNames[i],
            key: columnNames[i]
          };
          columnMapArray.push(columnMap);
        }
        
        const jsonStringColumn = JSON.stringify(columnMapArray, null, 2);
        const jsonArray=[];
        for (let i = 1; i < csvData.length; i++) {
          const currentItem = csvData[i];
          const itemObject = {};
          itemObject['key']=i;
          for (let j = 0; j < columnNames.length; j++) {
            itemObject[columnNames[j]] = currentItem[j];
          }
        
          jsonArray.push(itemObject);
        }
        
        const jsonString = JSON.stringify(jsonArray, null, 2);
        // console.log(jsonString,'jsonstring');
        setTableData(jsonArray);
        setCoulumndata(columnMapArray)
        // console.log(jsonStringColumn,'col');

        // this.setState({ csvData });
      };

      reader.readAsText(selectedFile);



      const formData = new FormData();
      formData.append('data-file', selectedFile, selectedFile.name);

      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
      axios.post('http://127.0.0.1:8000/create/', formData)
        .then(res => setFileUpload(true))
        .catch(err => console.log(err));
    }
  };
  // console.log(tabledata,columndata);


  const fileData = () => {
    if (!selectedFile) {
      return (
        <div>
          <br />
          <Text style={{color:"red"}}><b>Choose File before Pressing the Upload button</b></Text>
        </div>
      );
    }else {
      return (
        <div>
          <br />
          { !fileupload && <Text style={{color:"green"}}><b>File Selected successfully, Click on upload button</b></Text>}
          { fileupload && <Text style={{color:"green"}}><b>File uploaded succesfully</b></Text>}
        </div>
      );
    }
  };

  const onQuestionInput = event => {
    setAskedQuestion(event.target.value);
  };
  let newmap={};
  const onQuestionUpload = () => {
    // console.log(askedQuestion);
    newmap={}
    if (questionansmap[askedQuestion]){
      newmap=questionansmap;
    }else{
      newmap=questionansmap;
      newmap[askedQuestion]='Waiting';
    }
    if (selectedFile) {
      if (askedQuestion) {
        // Convert the string to a Blob
        const questionBlob = new Blob([askedQuestion], { type: 'text/plain' });
  
        const formData = new FormData();
        formData.append('question', questionBlob, 'question.txt');
  
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
        axios
          .post('http://127.0.0.1:8000/askQuestion/', formData)
          .then(res => {setAskedAnswer(res.data.askedQuestion.content);
            newmap[askedQuestion]=res.data.askedQuestion.content;
            setquestionansmap(newmap);})
          .catch(err => console.log(err));

        
      } else {
        // console.log('Ask question');
      }
    } else {
      alert('Please upload file first')
    }
  };
  useEffect(() => {
    // Use setInterval to update questionansmap at a regular interval
    const interval = setInterval(() => {
      // Create a new map with updated values
      const updatedMap = { ...questionansmap };
      // Update values in the updatedMap

      setquestionansmap(updatedMap);
    }, 1000); // Update every 10 seconds (adjust the interval as needed)

    // Cleanup the interval when the component unmounts or when the dependency array changes
    return () => clearInterval(interval);
  }, [questionansmap]);
  // if (tabledata.length>0){
  //   // console.log(tabledata)
    
  // }
  // console.log(questionansmap,'questionmap',Object.keys(questionansmap).length);
  

  return (
    <div >
    <Row>
    <Col span={6} style={{borderRight:"2px solid #FFE0B2",minHeight:"100vh",background:"#FFE0B2"}}>
      <div style={{marginTop:"2vh"}}>
        <Input type="file" onChange={onFileChange} style={{width:"20vw",borderRadius:"8px"}}/>
        <Button type="primary" onClick={onFileUpload} style={{marginTop:"1vh",borderRadius:"10px"}}>Upload!</Button>
        {fileData()}
        {fileupload && <Button type="primary" onClick={showModal} style={{borderRadius:"10px"}}>
          View Data
        </Button>}
      </div>
      </Col>
      <Col span={18}>
      <div style={{backgroundColor:"#F06292",minHeight:"100vh"}}>
      <div style={{width:'60vw',display:"flex",paddingTop:"15px",marginLeft:"8vw" ,position:"fixed"}}>
        <Input type="text" onChange={onQuestionInput} placeholder='Type your question' style={{borderTopLeftRadius:"15px",borderBottomLeftRadius:"15px"}}/>
        <Button type="primary" onClick={onQuestionUpload} style={{borderTopRightRadius:"15px",borderBottomRightRadius:"15px"}}>Ask</Button>
      </div>
      <Modal title="CSV Data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      {tabledata.length>0 && <Table dataSource={tabledata} columns={columndata} />}
      </Modal>
      {Object.keys(questionansmap).length>0 && <ChatInterface chatdata={questionansmap}/>}
      
      {/*{Object.keys(questionansmap).length>0 && <ChatInterface chatdata={questionansmap}/>}
      <div style={{width:'60vw',display:"flex",marginTop:"15px"}}><Text style={{color:"#FF8F00"}}><b>{askedAnswer}</b></Text></div>*/}
      </div>
      </Col>
      </Row>
    </div>
  );
};

export default EmpUpload;


// 9410418850