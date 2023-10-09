import { Button, Col, Row, Typography, Image } from "antd";

const LandingPage = () => {
  return (
    <section
      style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div style={{ marginBottom: 16 }}>
            <Typography.Title>
              Generate images with a click of a button
            </Typography.Title>
            <Typography.Title
              level={4}
              type="secondary"
              style={{ color: "#ccd7f5" }}
            >
              Create custom images in seconds with the help of Artificial
              Intelligence
            </Typography.Title>
          </div>
          <Button href="/create" type="primary" ghost>
            Generate your Images
          </Button>
        </Col>
        <Col span={12}>
          <Image
            width={500}
            src="https://ai-icon-generator.s3.us-east-2.amazonaws.com/cljuw4xah000tr2vmeb1f26wf"
            alt="Landing Page Image"
          />
        </Col>
      </Row>
    </section>
  );
};

export default LandingPage;
