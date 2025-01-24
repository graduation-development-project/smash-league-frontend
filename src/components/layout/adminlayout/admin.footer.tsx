'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                Smash League Project ©{new Date().getFullYear()} Created by @smashleague
            </Footer>
        </>
    )
}

export default AdminFooter;