import { Button, Col, Row, Typography, Image } from "antd";

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
              Create custom icons in seconds with the help of Artificial
              Intelligence
            </Typography.Title>
          </div>
          <Button href='/generate' type='primary' ghost>
            Generate your Icons
          </Button>
        </Col>
        <Col span={12}>
          <Image
            width={500}
            src='https://ai-icon-generator.s3.us-east-2.amazonaws.com/cljk5l6tw0001r25sdhtgrm6j'
            alt='Landing Page Image'
          />
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
