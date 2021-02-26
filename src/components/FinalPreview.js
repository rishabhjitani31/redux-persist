import { useState, useEffect }from 'react';
import { Button, Card } from 'antd';
import { useSelector } from 'react-redux';
import '../pages/MainForm.css'

const personalObj = {
  address: 'Address',
  ssn: 'SSN',
  state: 'State',
  name: 'Name',
  city: 'City',
  zipCode: 'Zip Code'
}

const FinalPreview = props => {

  const [debitAddress, setDebitAddress] = useState('');

  const previewForm = useSelector(state => state?.form); 

  const debitDetails = previewForm?.debitDetails;
  const personalDetails = previewForm?.personalDetails;
  const businessDetails = previewForm?.businessDetails;
  const businessChecked = previewForm?.businessChecked;
  const debitPersonalChecked = previewForm?.debitPersonalChecked;
  const debitBusinessChecked = previewForm?.debitBusinessChecked; 

  useEffect(() => {
    if (debitPersonalChecked) {
      setDebitAddress('Same as Personal Address');
    } else if (debitBusinessChecked) {
      setDebitAddress('Same as Business Address');
    } else {
      setDebitAddress('');
    }
  }, [debitPersonalChecked,debitBusinessChecked])

  const onBackClick = () => {
      props.handleBackButton();
  }

  const onSubmit = () => {
    props.handleSubmit();
  }

  return (
  <>
   <div>
    <Card 
      title="Personal Info"
      style={{ width: 600, marginBottom: 20 }}
    >
       {
          Object.entries(personalDetails).map(([key, value], index) => {
           return (
            <div key={index} className='preview-screen'>
              <div className='label'>{personalObj[key]}</div>
              <div className='value'>{value}</div>
            </div>
           )
          })
        }
    </Card>
    <Card 
      title="Business Info"
      style={{ width: 600, marginBottom: 20 }}
    >
       <div className='preview-screen'>
          <div className='label'>Business Name</div>
          <div className='value'>{businessDetails?.address}</div>
        </div>
        <div className='preview-screen'>
          <div className='label'>State Registered</div>
          <div className='value'>{businessDetails?.stateRegistered}</div>
        </div>
        {
          businessChecked ? (
            <div className='preview-screen'>
              <div className='label'>Address </div>
              <div className='value'>Same as personal address</div>
            </div> )
          : 
          (
          <>
            <div className='preview-screen'>
                <div className='label'>Address</div>
                <div className='value'>{businessDetails?.address}</div>
            </div>
            <div className='preview-screen'>
              <div className='label'>City</div>
              <div className='value'>{businessDetails?.city}</div>
            </div>
            <div className='preview-screen'>
              <div className='label'>State</div>
              <div className='value'>{businessDetails?.state}</div>
            </div>
            <div className='preview-screen'>
              <div className='label'>Zip Code</div>
              <div className='value'>{businessDetails?.zipCode}</div>
            </div>
          </>
          )
        }
    </Card>
    <Card 
      title="Debit Card Info"
      style={{ width: 600, marginBottom: 20 }}
    >
      <div className='preview-screen'>
        <div className='label'>Name To Be Printed</div>
        <div className='value'>{debitDetails?.printedName}</div>
      </div>
      {
          Boolean(debitAddress.length) ? (
            <div className='preview-screen'>
              <div className='label'>Address </div>
              <div className='value'>{debitAddress}</div>
            </div> )
          : 
          (
          <>
            <div className='preview-screen'>
                <div className='label'>Address</div>
                <div className='value'>{debitDetails?.address}</div>
            </div>
            <div className='preview-screen'>
              <div className='label'>City</div>
              <div className='value'>{debitDetails?.city}</div>
            </div>
            <div className='preview-screen'>
              <div className='label'>State</div>
              <div className='value'>{debitDetails?.state}</div>
            </div>
            <div className='preview-screen'>
              <div className='label'>Zip Code</div>
              <div className='value'>{debitDetails?.zipCode}</div>
            </div>
          </>
          )
        }
    </Card>
    <div className='step-2-3-buttons'>
        <Button type="default" onClick={onBackClick}>
            Back
        </Button>
        <Button type="primary" onClick={onSubmit}>
            Sumbit
        </Button>
      </div>
    </div>
  </>
  );
};

export default FinalPreview;
