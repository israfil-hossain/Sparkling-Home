'use client'
import React, { useState } from 'react'
import { DateTime, Payment, Services } from '../service'
import Stepper from './Stepper'
import StepperController from './StepperController'
import { StepperContext } from '@/context/StepperContext'
import Address from '../service/Address'
import { ServiceData } from '@/model/ServiceModel'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { AccordionSection } from '../home'
import { CheckIcon, CircleIcon, LocateIcon, PawPrintIcon } from '../common/Icons/Icons'

type Props = {
  accordionTitle?:any,
  accordion?:any,
}

const MainStepper = (props: Props) => {
  const {accordionTitle,accordion } = props;
  const steps = ['Service', 'Date & Time', 'Address', 'Payment', 'Overview']
  const [currentStep, setCurrentStep] = useState(1)
  const [serviceData, setServiceData] = useState<ServiceData>({})
  const [dateData, setDateData] = useState('')
  const [paymentData, setPaymentData] = useState('')
  const [isServiceFormValid, setIsServiceFormValid] = useState(false)


  const displayStep = (step: any) => {
    switch (step) {
      case 1:
        return <Services validateForm={setIsServiceFormValid} />
      case 2:
        return <DateTime />
      case 3:
        return <Address />
      case 4:
        return <Address />
      default:
    }
  }

  const handleClick = (direction: any) => {
    if (direction === 'next' && !isServiceFormValid) {
      return
    }
    let newStep = currentStep
    direction === 'next' ? (newStep += 1) : (newStep -= 1)
    //check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
  }
  return (
    <div className='container mb-10 flex  flex-col-reverse lg:flex-row lg:space-x-5'>
      <div className=' mx-0 mb-10 mt-10 w-[100%] rounded-xl lg:mx-auto  lg:w-[55%] '>
        {/* Stepper  */}
        <div className='container mt-5'>
          <Stepper currentStep={currentStep} steps={steps} />

          {/* Diplay Components  */}
          <div className='my-10 p-5'>
            <StepperContext.Provider
              value={{
                serviceData,
                setServiceData,
                paymentData,
                setPaymentData,
                dateData,
                setDateData
              }}
            >
              {displayStep(currentStep)}
            </StepperContext.Provider>
          </div>
        </div>

        {/* Navigation Controls */}
        {currentStep !== steps.length && (
          <StepperController
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            isServiceFormValid={isServiceFormValid}
          />
        )}
      </div>
      <div className=' w-full    lg:mx-5 lg:w-[40%]'>
        <Card className='lg:w-[472px] w-full rounded-lg bg-white shadow-md'>
          <CardHeader>
            <CardTitle className='text-gray-700 text-lg font-semibold '>
              HOME CLEANING
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-center '>
              <div className='text-5xl font-bold text-blue-900'> {serviceData?.apartmentSize} kr</div>
              <div className='text-gray-500 text-sm'>
                before rut deduction 2,317 kr
              </div>
            </div>
            <div className='border-gray-200 flex justify-between border-t py-4'>
              <div className='flex items-center space-x-1'>
                <CheckIcon className='h-5 w-5 text-green-500' />
                <span className='text-gray-700 text-sm font-medium'>
                  Cleaning supplies
                </span>
                <CircleIcon className='text-gray-500 h-4 w-4' />
              </div>
              <span className='text-gray-700 text-sm font-medium'>3.5 h</span>
            </div>
            <div className='flex justify-between py-4'>
              <div className='flex items-center space-x-1'>
                <LocateIcon className='text-gray-700 h-5 w-5' />
                <span className='text-gray-700 text-sm font-medium'>
                  1234, 11115
                </span>
              </div>
              <div className='flex items-center space-x-1'>
                <PawPrintIcon className='text-gray-700 h-5 w-5' />
                <span className='text-gray-700 text-sm font-medium'>Cats</span>
              </div>
            </div>
            <div className='border-gray-200 border-t pt-4'>
              <div className='rounded-lg bg-slate-100 p-5 '>
                <div className='flex justify-between'>
                  <span className='text-gray-700 text-sm'>
                    Cleaning 648 kr/h x 3.5 h
                  </span>
                  <span className='text-gray-900 text-sm font-medium'>
                    2,268 kr
                  </span>
                </div>
                <div className='flex justify-between py-2'>
                  <span className='text-gray-700 text-sm'>
                    Eco-friendly cleaning supplies
                  </span>
                  <span className='text-gray-900 text-sm font-medium'>
                    49 kr
                  </span>
                </div>
                <div className='flex justify-between py-2'>
                  <span className='text-gray-700 text-sm font-medium'>
                    Before RUT deduction
                  </span>
                  <span className='text-gray-900 text-sm font-medium'>
                    2,317 kr
                  </span>
                </div>
                <div className='flex justify-between pt-2'>
                  <span className='text-gray-800 text-lg font-bold'>TOTAL</span>
                  <span className='text-2xl font-bold text-blue-800'>
                    1,183 kr
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className='lg:w-[472px] w-full px-4 hidden lg:flex flex-col'>
          <AccordionSection accordionTitle={accordionTitle} accordion={accordion}/>
        </div>
       
      </div>
    </div>
  )
}



export default MainStepper
