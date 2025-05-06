"use client"

import type React from "react"

import { createReportAPI } from "@/services/report"
// import { LoadingOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from "@ant-design/icons"
import { Button, Form, Typography, Divider } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useState } from "react"
import { toast } from "react-toastify"
import { CheckCircleOutlined, ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography

const ReportDetails = ({
  detail,
  isOrganizer,
  user,
}: {
  detail: any
  isOrganizer: boolean
  user: any
}) => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [charCount, setCharCount] = useState<number>(0)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmitReport = async (values: any) => {
    setIsLoading(true)
    try {
      const response = await createReportAPI(
        {
          tournamentId: detail.id,
          reason: values.reportDescription,
        },
        user.access_token,
      )

      if (response?.status === 200 || response?.status === 201) {
        toast.success(`${response?.data?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setSubmitStatus("success")
        form.resetFields()
        setCharCount(0)
      } else {
        toast.error(`${response?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setSubmitStatus("error")
      }
    } catch (error: any) {
      toast.error(`${error?.message || "An error occurred"}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setSubmitStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length)
  }

  const mainColor = detail?.mainColor || "#FF8243"

  return (
    <div className="w-full ">
      <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
        {/* Header */}
        <div
          className="w-full px-6 py-4 rounded-t-lg flex items-center justify-between"
          style={{ backgroundColor: mainColor }}
        >
          <div>
            <h3 className="text-white text-xl font-bold">Report Form</h3>
            <p className="text-white/80 text-sm mt-1">Please provide details about your concerns</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
            <ExclamationCircleOutlined className="text-white text-xl" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success Message */}
          {submitStatus === "success" && (
            <div className="mb-6 bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 flex items-start">
              <CheckCircleOutlined className="text-green-600 mr-2 mt-1" />
              <div>
                <p className="font-medium">Report Submitted Successfully</p>
                <p className="text-sm">Thank you for your feedback. Our team will review your report shortly.</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === "error" && (
            <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-lg border border-red-200 flex items-start">
              <ExclamationCircleOutlined className="text-red-600 mr-2 mt-1" />
              <div>
                <p className="font-medium">Submission Failed</p>
                <p className="text-sm">There was a problem submitting your report. Please try again.</p>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 mb-6">
            <div className="flex items-start">
              <ExclamationCircleOutlined className="text-primaryColor mr-2 mt-1" />
              <div>
                <p className="font-medium text-orange-800">Important Information</p>
                <p className="text-sm text-orange-700">
                  Your report will be reviewed by our moderation team. Please provide specific details and be as clear
                  as possible about the issue you&apos;re reporting.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <Form autoComplete="off" onFinish={handleSubmitReport} layout="vertical" form={form} className="w-full">
            <Form.Item
              label={
                <div className="text-base font-medium">
                  Report Description
                  <div className="text-sm font-normal text-gray-500 mt-1">
                    Please describe the issue in detail. What specifically concerns you about this tournament?
                  </div>
                </div>
              }
              name="reportDescription"
              rules={[
                {
                  required: true,
                  message: "Please input your report description!",
                },
                {
                  min: 10,
                  message: "Description must be at least 10 characters",
                },
                {
                  max: 500,
                  message: "Description cannot exceed 500 characters",
                },
              ]}
              className="mb-6"
            >
              <TextArea
                placeholder="Please provide specific details about your concerns..."
                className="min-h-[300px] resize-y rounded-lg"
                style={{
                  borderColor: "#d9d9d9",
                }}
                onChange={handleTextChange}
              />
            </Form.Item>

            <div className="flex justify-between items-center mb-6">
              <div className="text-xs text-gray-500">{charCount}/500 characters</div>
            </div>

            <Divider className="my-6" />

            <Form.Item className="mb-0">
              <div className="flex justify-end gap-3">
                <Button
                  className="border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 font-medium"
                  onClick={() => {
                    form.resetFields()
                    setCharCount(0)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="font-medium shadow-sm hover:opacity-90"
                  style={{
                    backgroundColor: mainColor,
                    borderColor: mainColor,
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoadingOutlined className="mr-2" /> Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ReportDetails