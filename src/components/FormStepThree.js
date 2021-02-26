import { Form, Input, Button, Checkbox } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { 
  saveDebitDetails, 
  onDebitPersonalCheckedChange,
  onDebitBusinessCheckedChange
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

const FormStepthree = props => {

  const debitForm = useSelector(state => state?.form);

  const debitDetails = debitForm?.debitDetails;
  const personalDetails = debitForm?.personalDetails;
  const businessDetails = debitForm?.businessDetails;
  const dPersonalChecked =  debitForm?.debitPersonalChecked;
  const dBusinessChecked =  debitForm?.debitBusinessChecked;
  

  const dispatch = useDispatch();
  const [form] = Form?.useForm();

  const onFinish = (values) => {
    dispatch(saveDebitDetails(values));
    props.handleNextButton();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleBackClick = () => {
    const values = form.getFieldsValue();
    dispatch(saveDebitDetails(values));
    props.handleBackButton();
  }

  const onPersonalCheckedChange = (e) => {
    if (e.target.checked) {
      const values = form.getFieldsValue();
      form.setFieldsValue({
        ...values,
        address:personalDetails?.address 
      });
    }
    dispatch(onDebitPersonalCheckedChange(e?.target?.checked));
    dispatch(onDebitBusinessCheckedChange(false))
  }

  const onBusinessCheckedChange = (e) => {
    if (e.target.checked) {
      const values = form.getFieldsValue();
      form.setFieldsValue({
        ...values,
        address:businessDetails?.address 
      });
    }
    dispatch(onDebitBusinessCheckedChange(e?.target?.checked));
    dispatch(onDebitPersonalCheckedChange(false))
  }
  
  const onAddressChange = () => {
    dispatch(onDebitPersonalCheckedChange(false));
    dispatch(onDebitBusinessCheckedChange(false));
  }

  return (
    <Form
      {...layout}
      form={form}
      name="basic"
      initialValues={{...debitDetails}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name To Be Printed"
        name="printedName"
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
        label="Address"
        name="address"
        rules={[
          {
            required: true,
            message: 'Please input the address',
          },
        ]}
      >
        <Input onChange={onAddressChange} value={debitDetails.address}  />
      </Form.Item>
      <div className='checkbox-debit-tab'>
        <Checkbox onChange={onPersonalCheckedChange} checked={dPersonalChecked} >
          Same as Personal
        </Checkbox>
        <Checkbox onChange={onBusinessCheckedChange} checked={dBusinessChecked}>
          Same as Business
        </Checkbox>
      </div>
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

export default FormStepthree;
