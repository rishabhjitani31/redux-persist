import { Form, Input, Button, Checkbox } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { 
  saveBusinessDetails, 
  onBusinessCheckedChange
} from '../redux/actions'
import '../pages/MainForm.css'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const StepTwo = props => {

  const [form] = Form?.useForm();

  const businessForm = useSelector(state => state?.form); 

  const businessDetails = businessForm?.businessDetails;
  const personalDetails = businessForm?.personalDetails;
  const isChecked =  businessForm?.businessChecked;

  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(saveBusinessDetails(values));
    props.handleNextButton();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleBackClick = () => {
    const values = form.getFieldsValue();
    dispatch(saveBusinessDetails(values));
    props.handleBackButton();
  }

  const onCheckedChange = (e) => {
    if (e.target.checked) {
      const values = form.getFieldsValue();
      form.setFieldsValue({
        ...values,
        address:personalDetails?.address 
      })
    }
    dispatch(onBusinessCheckedChange(e?.target?.checked))
  }

  const onAddressChange = () => {
    dispatch(onBusinessCheckedChange(false))
  }

  return (
    <Form
      {...layout}
      form={form}
      name="basic"
      initialValues={{...businessDetails}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
        <Form.Item
        label="Business Name"
        name="bName"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="State Registered"
        name="stateRegistered"
        rules={[
          {
            validator: async (_, stateRegistered) => {
              if (!(/[a-z]/i.test(stateRegistered) && stateRegistered.length === 2 )) {
                return Promise.reject(new Error('Please input 2 letter alphabet only'));
              }
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: 'Please input the address',
          },
        ]}
      >
        <Input onChange={onAddressChange} value={businessDetails.address} />
      </Form.Item>
      <Checkbox 
        onChange={onCheckedChange} 
        checked={isChecked}
        style={ {marginBottom:'15px' }}
      >
        Same as Personal
      </Checkbox>
      <Form.Item
        label="City"
        name="city"
        rules={[
          {
            required: true,
            message: 'Please input the city',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="State"
        name="state"
        rules={[
          {
            validator: async (_, state) => {
              if (!(/[a-z]/i.test(state) && state.length === 2 )) {
                return Promise.reject(new Error('Please input 2 letter alphabet only'));
              }
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Zip Code"
        name="zipCode"
        rules={[
          {
            validator: async (_, zipCode) => {
              if (!(/^[+-]?\d+(\.\d+)?$/.test(zipCode) && zipCode.length === 5 )) {
                return Promise.reject(new Error('Please input 5 digit zip code number only'));
              }
            },
          }
        ]}
      >
        <Input />
      </Form.Item> 
      <Form.Item {...tailLayout}>
        <div className='step-2-3-buttons'>
            <Button type="default" onClick={handleBackClick} >
                Back
            </Button>
            <Button type="primary" htmlType="submit">
                Next
            </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default StepTwo;
