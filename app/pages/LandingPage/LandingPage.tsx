import { Button, Col, Row, Typography } from "antd";

const LandingPage = () => {
  return (
    <section className='mt-12 mb-24 grid grid-cols-1 gap-12 px-8 sm:mt-24 sm:grid-cols-2'>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div style={{ marginBottom: 16 }}>
            <Typography.Title>
              Generate icons with a click of a button
            </Typography.Title>
            <Typography.Title
              level={4}
              type='secondary'
              style={{ color: "#ccd7f5" }}
            >
              Use AI to generate icons in seconds instead of paying a designer
              and waiting for them to create them for you.
            </Typography.Title>
          </div>
          <Button href='/generate' type='primary' ghost>
            Generate your Icons
          </Button>
        </Col>
        <Col span={12}>
          <Typography.Title level={3}>
            [PLACEHOLDER] Use AI to generate icons in seconds instead of paying
            a designer and waiting for them to create them for you.
            [PLACEHOLDER]
          </Typography.Title>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <Button href='/checkout' type='primary' ghost>
            Generate your Icons
          </Button>
        </Col>
      </Row> */}

      {/* <Image
        src="/banner.png"
        alt="an image of a bunch of nice looking icons"
        width="400"
        height="300"
        className="order-first sm:-order-none"
      /> */}
    </section>
  );
};

export default LandingPage;
