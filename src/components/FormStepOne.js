import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { savePersonalDetails } from '../redux/actions';


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

const StepOne = props => {
  
  const [form] = Form?.useForm();

  const personalForm = useSelector(state => state?.form);
  const personalDetails = personalForm?.personalDetails;

  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(savePersonalDetails(values))
    props.handleNextButton();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="basic"
      initialValues={{...personalDetails}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
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
        label="SSN"
        name="ssn"
        rules={[
          {
            validator: async (_, ssn) => {
              if (!(/^[+-]?\d+(\.\d+)?$/.test(ssn) && ssn.length === 9 )) {
                return Promise.reject(new Error('Please input 9 digit ssn number only'));
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
        <Input />
      </Form.Item>

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
          }
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
          },
        ]}
      >
        <Input />
      </Form.Item> 

      <Form.Item {...tailLayout}>
        <Button 
            type="primary" 
            htmlType="submit"
        >
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StepOne;
