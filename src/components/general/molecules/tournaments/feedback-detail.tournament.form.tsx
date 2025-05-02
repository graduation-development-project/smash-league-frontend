import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, Rate, message, ConfigProvider, Form } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { createFeedbackAPI } from '@/services/feedback-tour';

const FeedbackModal = ({
  tourId,
  isModalOpen,
  setIsModalOpen,
  onClose,
}: {
  tourId: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const fetchCreateFeedback = async (feedback: any) => {
    try {
      await createFeedbackAPI(feedback, user.access_token);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = async (fieldValues: any) => {
    console.log('fieldValues', fieldValues);
    
    const feedbackPayload = {
      tournamentId: tourId,
      rating: fieldValues.rating,
      comment: fieldValues.comment,
    };    
    console.log('feedbackPayload', feedbackPayload);
    

    setLoading(true);
    await fetchCreateFeedback(feedbackPayload);
    setLoading(false);

    form.resetFields(); // clear form
    onClose(); // close modal
  };

  const handleCancel = () => {
    form.resetFields(); // clear form
    onClose(); // close modal
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorInfoBorder: '#FF8243',
          colorInfoBg: 'transparent',
          colorInfo: '#FF8243',
        },
      }}
    >
      <Modal
        title="Feedback"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{ rating: 0 }}
        >
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please give a rating!' }]}
            initialValue={5}
          >
            <Rate  />
          </Form.Item>

          <Form.Item
            name="comment"
            label="Comment"
            rules={[{ required: true, message: 'Please write a comment!' }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Input your feedback..."
            />
          </Form.Item>

          <div className="flex justify-end gap-5 mt-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              htmlType="submit"
              type="primary"
              icon={<FaPlus />}
              loading={loading}
            >
              Add
            </Button>
          </div>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default FeedbackModal;
