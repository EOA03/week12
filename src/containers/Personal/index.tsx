import { Card, Text } from '../../components'
import { Button, DatePicker, Input } from 'antd'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

interface Data{
    fullName: string,
    email: string,
    dob: Date | null,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    username: string,
    password: string
}

const initialValues = {
    fullName: '',
    email: '',
    dob: null,
    street: '',
    city: '',
    state: '',
    zipCode: '',
    username: '',
    password: ''
}

const validationSchema = yup.object({
    fullName: yup.string().required('Fullname must be filled'),
    email: yup.string().email().required('Email must be filled'),
    dob: yup.date().required('Date must be filled'),
    street: yup.string().required('Street Address must be filled'),
    city: yup.string().required('City must be filled'),
    state: yup.string().required('State must be filled'),
    zipCode: yup.string().required('Zip Code must be filled').matches(/^\d{5}$/, 'Zip Code must be 5 digits'),
    username: yup.string().required('Username must be filled'),
    password: yup.string().required('Password must be filled').min(8, 'Password must be at least 8 characters long').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
})

const Personal = () => {
    
    const handleSubmit = (values: Data) => {
        console.log(values);
    }
    
    const FormMik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    })
    
    const [step, setStep] = useState<number>(1);
    const handleNext = () => {
        if (step < 3) {
            let isStepValid = false;
            
            if (step === 1) {
                isStepValid = !FormMik.errors.fullName && !FormMik.errors.email && !FormMik.errors.dob;
                if (isStepValid) {
                    setStep((prevStep) => prevStep + 1);
                }
            } else if (step === 2) {
                isStepValid = !FormMik.errors.street && !FormMik.errors.city && !FormMik.errors.state && !FormMik.errors.zipCode;
                if (isStepValid) {
                    setStep((prevStep) => prevStep + 1);
                }
            } else {
                isStepValid = true;
            }
    
        }
    }
    
      
    const handlePrev = () => {
        if(step < 4){
            setStep((prevStep) => prevStep-1)
        }
    }

    return(
        <>
            <form onSubmit={FormMik.handleSubmit}>
                {step === 1 && (
                    <Card>
                        <Text type='h2'>Personal Information</Text>
                        <div>
                            <Text>Full Name:</Text>
                            <Input name='fullName' id='fullName' value={FormMik.values.fullName} onChange={FormMik.handleChange('fullName')} status={FormMik.errors.fullName && 'error'}></Input>
                            {FormMik.errors.fullName && (
                                <Text type='span'>{FormMik.errors.fullName}</Text>
                            )}
                        </div>
                        <div>
                            <Text>Email Address:</Text>
                            <Input name='email' id='email' value={FormMik.values.email} onChange={FormMik.handleChange('email')} status={FormMik.errors.email && 'error'}></Input>
                            {FormMik.errors.email && (
                                <Text type='span'>{FormMik.errors.email}</Text>
                            )}
                        </div>
                        <div>
                            <Text>Date of Birth:</Text>
                            <DatePicker name='dob' id='dob' value={FormMik.values.dob} onChange={(date) => FormMik.setFieldValue('dob', date)} status={FormMik.errors.dob && 'error'} />
                            {FormMik.errors.dob && (
                                <Text type='span'>{FormMik.errors.dob}</Text>
                            )}
                        </div>
                    </Card>
                )}
                {step === 2 && (
                    <Card>
                        <Text type='h2'>Address Information</Text>
                        <div>
                            <Text>Street Address:</Text>
                            <Input name='street' id='street' value={FormMik.values.street} onChange={FormMik.handleChange('street')} status={FormMik.errors.street && 'error'}></Input>
                            {FormMik.errors.street && (
                                <Text type='span'>{FormMik.errors.street}</Text>
                            )}
                        </div>
                        <div>
                            <Text>City:</Text>
                            <Input name='city' id='city' value={FormMik.values.city} onChange={FormMik.handleChange('city')} status={FormMik.errors.city && 'error'}></Input>
                            {FormMik.errors.city && (
                                <Text type='span'>{FormMik.errors.city}</Text>
                            )}
                        </div>
                        <div>
                            <Text>State:</Text>
                            <Input name='state' id='state' value={FormMik.values.state} onChange={FormMik.handleChange('state')} status={FormMik.errors.state && 'error'}></Input>
                            {FormMik.errors.state && (
                                <Text type='span'>{FormMik.errors.state}</Text>
                            )}
                        </div>
                        <div>
                            <Text>Zip Code:</Text>
                            <Input name='zipCode' id='zipCode' value={FormMik.values.zipCode} onChange={FormMik.handleChange('zipCode')} status={FormMik.errors.zipCode && 'error'}></Input>
                            {FormMik.errors.zipCode && (
                                <Text type='span'>{FormMik.errors.zipCode}</Text>
                            )}
                        </div>
                    </Card>
                )}
                {step === 3 && (
                    <Card>
                        <Text type='h2'>Account Information</Text>
                        <div>
                            <Text>Username:</Text>
                            <Input name='username' id='username' value={FormMik.values.username} onChange={FormMik.handleChange('username')} status={FormMik.errors.username && 'error'}></Input>
                            {FormMik.errors.username && (
                                <Text type='span'>{FormMik.errors.username}</Text>
                            )}
                        </div>
                        <div>
                            <Text>Password:</Text>
                        <Input name='password' id='password' value={FormMik.values.password} onChange={FormMik.handleChange('password')} status={FormMik.errors.password && 'error'}></Input>
                        {FormMik.errors.password && (
                                <Text type='span'>{FormMik.errors.password}</Text>
                            )}
                        </div>
                    </Card>
                )}
                <div>
                    {step > 1 && (
                        <Button onClick={handlePrev}>Previous</Button>
                    )}
                    {step > 0 && step < 3 && (
                        <Button type='primary' onClick={handleNext} htmlType='submit'>Next</Button>
                    )}
                    {step === 3 && (
                        <Button type='primary' htmlType='submit'>Submit</Button>
                    )}
                </div>
            </form>
        </>
    )
}

export default Personal