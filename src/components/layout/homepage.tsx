'use client'

import { CrownOutlined } from "@ant-design/icons"
import { Result } from "antd"

const HomePage = () => {
    return (
        <div style={{ padding: 20 }}>
            <Result
                icon={<CrownOutlined />}
                title="Smash League Project - createdBy @smashleague"
            />
        </div>
    )
}

export default HomePage;

