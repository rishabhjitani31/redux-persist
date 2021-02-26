import { lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, message } from 'antd'
import './MainForm.css';
import { 
    setIndex, 
    handleReset,
    populateUsersList
} from '../redux/actions';

const StepOne = lazy(() => import("../components/FormStepOne"));
const StepTwo = lazy(() => import("../components/FormStepTwo"));
const Stepthree = lazy(() => import("../components/FormStepThree"));
const FinalPreview = lazy(() => import("../components/FinalPreview"));

const MainForm = () => {

    let state = useSelector(state => state);

    const usersList = state?.usersList;
    let index = state?.form?.index
    const debitDetails = state?.form?.debitDetails;
    const personalDetails = state?.form?.personalDetails;
    const businessDetails = state?.form?.businessDetails;
    
    const dispatch = useDispatch() 
       
    const handleNextButton = () => {
        dispatch(setIndex(index + 1));
    }
    
    const handleBackButton = () => {
        dispatch(setIndex(index - 1));
    }

    const onHandleSubmit = () => {
        const obj = {
            personalDetails,
            businessDetails,
            debitDetails 
        }
        usersList.push(obj);
        dispatch(handleReset());
        dispatch(populateUsersList(usersList));
        message.success('User onboarded succesfully');
    }

    console.log('Users onboarded details', usersList);
    switch (index) {
        case 1:
            return (
                <div className='custom-form'>
                    <Card 
                        title="Personal Info"
                        style={{ width: 600 }}
                    >
                        <StepOne  
                            handleNextButton={handleNextButton}
                        />
                    </Card>
                    
                </div>
            );
        case 2:
            return (
                <div className='custom-form'>
                      <Card 
                        title="Business Info"
                        style={{ width: 600 }}
                    >
                        <StepTwo  
                            handleNextButton={handleNextButton} 
                            handleBackButton={handleBackButton}
                        />
                    </Card>
                </div>
            );
        case 3:
            return (
                <div className='custom-form'>
                    <Card 
                        title="Debit Card Info"
                        style={{ width: 600 }}
                    >
                        <Stepthree 
                            handleNextButton={handleNextButton} 
                            handleBackButton={handleBackButton}
                        />
                </Card>
                </div>
            );

        case 4:
            return (
                <div className='custom-form'>
                    {<h1>Review Info</h1> }
                    <FinalPreview 
                        handleBackButton={handleBackButton}
                        handleSubmit={onHandleSubmit} 
                    />
                </div>
            );
        default:
            break;
    }
}

export default MainForm;