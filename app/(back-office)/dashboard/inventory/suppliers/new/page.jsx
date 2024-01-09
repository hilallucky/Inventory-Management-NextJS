"use client"

import SubmitButton from '@/components/FormInputs/SubmitButton'
import TextInput from '@/components/FormInputs/TextInput'
import TextareaInput from '@/components/FormInputs/TextareaInput'
import FormHeader from '@/components/dashboard/FormHeader'
import { makePostRequest, makePutRequest } from '@/lib/apiRequest'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function NewSupplier({initialData={}, isUpdate=false}) {

  //console.log(initialData)
  const router = useRouter()

  const selectOptions =[
    {
      label: "Main",
      value: "main"
    },
    {
      label: "Branch",
      value: "branch"
    },
  ]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData
  })

  const [loading, setLoading] = useState(false)

  function redirect(){
    router.push("/dashboard/inventory/suppliers")
  }

  async function onSubmit(data){
    console.log(data)
    if(isUpdate){
      makePutRequest(
        setLoading,
        `/api/suppliers/${initialData.id}`,
        data,
        "Supplier",
        redirect,
        reset
      )
    }else{
      makePostRequest(
        setLoading,
        "/api/suppliers",
        data,
        "Suppliers",
        reset
      )
    }
  }

  return (
    <div>
      {/* Header */}
      <FormHeader 
      title={isUpdate?"Update Supplier":"New Supplier"} href="/dashboard/inventory/suppliers"/>
      {/* Form */}
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className='w-full max-w-4xl p-4 bg-white border my-3 border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto'>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

        <TextInput 
          label="Supplier Name" 
          name="title"
          register={register} 
          errors={errors} 
          className='w-full'
        />

        <TextInput 
          label="Supplier Phone" 
          name="phone"
          register={register} 
          errors={errors} 
          className='w-full'
        />

        <TextInput 
          label="Supplier Email" 
          name="email"
          type='email'
          register={register} 
          errors={errors} 
          className='w-full'
        />

        <TextInput 
          label="Supplier Address" 
          name="address"
          register={register} 
          errors={errors} 
          className='w-full'
        />

        <TextInput 
          label="Supplier Contact Person" 
          name="contactPerson"
          register={register} 
          errors={errors} 
          className='w-full'
        />

        <TextInput 
          label="Supplier Code" 
          name="supplierCode"
          register={register} 
          errors={errors} 
          className='w-full'
        />

        <TextInput 
          label="Supplier Tax ID" 
          name="taxID"
          register={register} 
          errors={errors} 
        />

        <TextareaInput 
          label="Supplier Payment Terms" 
          name="paymentTerms"
          register={register} 
          errors={errors}
        />

        <TextareaInput 
          label="Notes" 
          name="notes"
          register={register} 
          errors={errors}
        />
       
        </div>
        <SubmitButton isLoading={loading} title={isUpdate?"Updated Supplier":"New Supplier"}/>
      </form>
    </div>
  )
}
