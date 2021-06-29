import React, { Component } from "react";
import Magnifier from "react-magnifier";
import {
	Container,
    Card,
	Row,
	Col,
	Jumbotron,
	Image,
	Button,
	Carousel,
	Navbar, 
	Nav,
	CardColumns,
	ListGroup
} from "react-bootstrap";
import { jarallax, jarallaxVideo } from "jarallax";
import VidyardEmbed from "@vidyard/embed-code";
import Lightbox from 'react-image-lightbox';
import Scrollspy from "react-scrollspy";
import {Animated} from "react-animated-css";
import ScrollAnimation from "react-animate-on-scroll";

import Footer from "../../components/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

import "./Microsite.css";
import PLACEHOLDER from '../../images/placeholder.png';

import {
    BrowserView,
    MobileView,
  } from "react-device-detect";
import 'react-image-lightbox/style.css';
import WHEEL from '../../images/AGI-Wheel-2.png';
const images = [WHEEL];

// jarallaxVideo();

window.onscroll = function () {
	if (document.body.scrollTop > 64 || document.documentElement.scrollTop > 64) {
		document.getElementById("logo").style.height = "36px";
	} else {
		document.getElementById("logo").style.height = "42px";
	}
};



export default class Microsite extends Component {
	constructor(props) {
        super(props);
    
        this.state = {
          photoIndex: 0,
          isOpen: false,
        };
      }
    
    componentDidMount() {
		// jarallax(document.querySelectorAll(".jarallax"));
		// render all players from placeholder images in the document
		VidyardEmbed.api.renderDOMPlayers();

		const links = document.querySelectorAll(".nav-scroll");
        
		for (const link of links) {
			link.addEventListener("click", function(e){
				e.preventDefault();

				const href = this.getAttribute("href");
				const offsetTop = document.querySelector(href).offsetTop - 80;

				window.scroll({
					top: offsetTop,
					behavior: "smooth",
				});
			});
		}
	}

    handleMouseOver = (event) => {
        this.removeActiveTile();
        event.target.classList.add('active-tile','hover');
    };
    handleMouseLeave = () => {
        this.removeActiveTile();
    }

    removeActiveTile = () => {
        let i;
        const elements = document.getElementsByClassName('tile_container');
        for (i = 0; i < elements.length; i++) { elements[i].classList.remove('active-tile','hover'); }
    }

	render() {
        const { photoIndex, isOpen } = this.state;
		return (
			<>
				{/* NAVIGATION */}
				<Navbar
					collapseOnSelect
					expand="lg"
					bg="white"
					variant="light"
					sticky="top"
				>
					<Container>
						<Navbar.Brand className="nav-scroll" href="#microsite">
							<Image
								alt="Co-Branded Logo"
								src="assets/images/agi-salesforce.svg"
								id="logo"
								className="d-inline-block align-top"
								loading="lazy"
							></Image>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Scrollspy
								items={[
									"challenge",
									"innovation",
									"experiences",
									"resources"
								]}
								currentClassName="active"
								componentTag="div"
								className="navbar-nav ml-auto"
							>
								<Nav.Link className="nav-scroll text-agi-green" href="#challenge">
									CHALLENGE
								</Nav.Link>
								<Nav.Link className="nav-scroll text-agi-green" href="#innovation">
									INNOVATION PRIORITIES
								</Nav.Link>
								<Nav.Link className="nav-scroll text-agi-green" href="#experiences">
									EXPERIENCE VIDEOS
								</Nav.Link>
								<Nav.Link className="nav-scroll text-agi-green" href="#resources">
									RESOURCE CENTRE
								</Nav.Link>
							</Scrollspy>
						</Navbar.Collapse>
					</Container>
				</Navbar>


				{/* MAIN CONTENT */}
				<Container id="microsite" fluid>
					{/* HERO */}
					<Row id="hero">
						<Col className="px-0">
							<Jumbotron
								fluid
								className="hero text-white mb-0"
							>
								<Container className="my-2">
									<Row id="hero">
										<Col className="px-0">
											<Container fluid>
											<div className="d-flex">
												<Row className="my-4 py-4 vertical-center">
													<Col lg={7}
														className="hero-left text-darkgrey text-left">
                                                        <h4 className="agi-header-normal my-4">
														Feeding the world with <span className="agi-black-italic text-agi-green">AGI</span> &amp; <span className="agi-black-italic text-sf">Salesforce</span>
														</h4>
														<h1 className="mb-4">
															Grow <span className="agi-black-italic text-agi-green">everlasting relationships</span> with the potential of the Farmer 360
														</h1>
													</Col>
													<Col lg={5} className="customer-360_left order-2 order-lg-1">
													<BrowserView>
														<Image
															src={WHEEL}
															alt="AGI Farmer 360"
															className="wheel-img"
															fluid
															onClick={() => this.setState({ isOpen: true })}
														/>
														<div>
															{isOpen && (
															<Lightbox
																mainSrc={images[photoIndex]}
																onCloseRequest={() => this.setState({ isOpen: false })}
																onMovePrevRequest={() =>
																this.setState({
																	photoIndex: (photoIndex + images.length - 1) % images.length,
																})
																}
																onMoveNextRequest={() =>
																this.setState({
																	photoIndex: (photoIndex + 1) % images.length,
																})
																}
															/>
															)}
														</div>
													</BrowserView>
													<MobileView>
														<Magnifier src={WHEEL} width={'100%'} mgShape='circle' mgHeight={300} mgWidth={300} zoomFactor={0.75}/>
													</MobileView>
														{/* <Image
															src="/assets/images/AGI-Wheel.png"
															alt="AGI Farmer 360"
															className="wheel-img"
															fluid
														/> */}
													</Col>
												</Row>
											</div>
											</Container>
										</Col>
									</Row>
								</Container>
							</Jumbotron>
						</Col>
					</Row>

					{/* INTRO */}
					<Row id="challenge" className="bg-white p-5">
						<Col className="px-0">
							<div>
								<Jumbotron
									fluid
									className="hero bg-white text-center mb-0"
								>
									<Container className="py-2">
										<Row>
											<Col>
												
												<Container fluid>
                            <Row className="align-items-center">
                                <Col lg={3}>
                                    <ScrollAnimation animateIn="slideInLeft" animateOnce>
                                        <Image
                                            src="/assets/images/agi-feed-commercial-facilities.jpg"
                                            alt="Air Canada Express"
                                            className="p-2"
                                            style={{
                                                maxWidth: "200px"
                                            }}
                                        ></Image>
                                    </ScrollAnimation>
                                </Col>
                                <Col lg={6}>
								<h1 className="agi-black-italic text-black mb-4">
													CHALLENGE
												</h1>
                                    <p className="lead px-2">
									How can Salesforce help AGI accelerate to a $5 billion company through creating 'sticky' experiences, scaling revenue in all go-to-market channels, all while retaining the agility to adapt to acquisitions and environmental adjustments.
                                    </p>
                                </Col>
                                <Col lg={3}>
                                <ScrollAnimation animateIn="slideInRight" animateOnce>
                                        <Image
                                            src="/assets/images/agi-grain-commercial-facilities.jpg"
                                            alt="Air Canada Domestic"
                                            className="p-1"
                                            style={{
                                                maxWidth: "200px"
                                            }}
                                        ></Image>
                                    </ScrollAnimation>
                                </Col>
                            </Row>
                        </Container>
											</Col>
                                            
										</Row>
									</Container>
								</Jumbotron>
							</div>
						</Col>
					</Row>

                    {/* PILLARS */}
                    <Row id="innovation" className="p-1 bg-white">
                        <Col>
                        <Jumbotron
									fluid
									className="hero bg-white text-center mb-0"
								>
                                    <h1 className="agi-black-italic text-black mb-4">
                                        INNOVATION PRIORITIES
                                    </h1>
                        <Container>
                            <Row >
                                <Col className="px-0">
                                    <Container
                                        className="p-0"
                                        fluid>
                                        <Row>
                                            <Col md={4}
                                                className="px-0">
                                                    <Card className="tile_container tile-container_1 m-2 active-tile" onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                                                        <Animated animationIn="fadeIn" animationInDuration={800} isVisible={true} className="tile-overlay">
                                                            <Card.Body className="h-100">
															<span className="agi-black-italic tile-title">Decreasing Costs</span><br></br>
															Standardize processes in sales, service and retailers to free up FTE and optimize SG&amp;A and Direct Labour costs.
                                                            </Card.Body>
                                                        </Animated>
                                                    </Card>
                                            </Col>
                                            <Col md={4}
                                                className="px-0">
                                                <Card className="tile_container tile-container_2 m-2" onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                                                    <Animated animationIn="fadeIn" animationInDuration={800} isVisible={true} className="tile-overlay">
                                                        <Card.Body className="h-100">
														<span className="agi-black-italic tile-title">Increasing Margins</span><br></br>
														Leverage insights, standard processes, demand capacity planning to decrease SG&amp;A, COGS &amp; Direct Labour costs while increasing revenue
                                                        </Card.Body>
                                                    </Animated>
                                                </Card>
                                            </Col>
                                            <Col md={4}
                                                className="px-0">
                                                <Card className="tile_container tile-container_3 m-2"  onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                                                    <Animated animationIn="fadeIn" animationInDuration={800} isVisible={true} className="tile-overlay">
                                                        <Card.Body className="h-100">
														<span className="agi-black-italic tile-title">Organic Growth</span><br></br>
														Drive organic growth across the entire AGI portfolio, leveraging existing customers as a springboard for AGI SureTrack
                                                        </Card.Body>
                                                    </Animated>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                        </Jumbotron>
                    </Col>
                    </Row>

					{/* DEMOS */}
					<Row id="experiences" className="bg-agi-green align-items-center py-5">
                    <Col className="px-0">
                        <Container 
                            className="px-0"
                            fluid>
                            <Carousel interval={null}>

                                {/* NAF 1 */}
                                <Carousel.Item className="bg-persona_1">
                                    <div className="d-flex">
                                        <Container className="align-self-center text-white">
                                            <Row>
                                                <Col
                                                    md={{
                                                        span: 10,
                                                        offset: 1,
                                                    }}
                                                    className="pb-5"
                                                >
                                                    <Row
                                                        className="py-2"
                                                    >
                                                    </Row>
													<div className="pb-2">
													<h1 className="text-center mb-1">
															NORTH AMERICAN FARM
														</h1>
														<h3 className="text-center agi-header-normal mb-1" style={{fontSize: '1.25rem'}}>
															Story Flows
														</h3>
													</div>
                                                		
                                                    <Row>
													<Col lg={{
                                                            span: 4,
                                                            offset: 2
                                                        }}>
                                                            {/* <Image
																style={{maxWidth: '100%'}}
                                                                className="vidyard-player-embed"
                                                                src="https://play.vidyard.com/FeTKjM313SCEdDht2GCbMp.jpg"
                                                                data-uuid="FeTKjM313SCEdDht2GCbMp"
                                                                data-v="4"
                                                                data-type="lightbox"
																aspect="landscape"
                                                            /> */}
															<Image
                                                                src={PLACEHOLDER}
                                                                fluid>
                                                            </Image>
                                                            <p className="text-center salesforce-sans-bolditalic mt-2">Vignette 1</p>
                                                        </Col>
                                                        <Col lg={4}>
                                                            {/* <Image
                                                                style={{maxWidth: '100%'}}
                                                                className="vidyard-player-embed"
                                                                src="https://play.vidyard.com/48GxmDLTs7UE8roxoJxd4e.jpg"
                                                                data-uuid="48GxmDLTs7UE8roxoJxd4e"
                                                                data-v="4"
                                                                data-type="lightbox"
                                                            /> */}
															<Image
                                                                src={PLACEHOLDER}
                                                                fluid>
                                                            </Image>
                                                            <p className="text-center salesforce-sans-bolditalic mt-2">Vignette 2</p>
                                                        </Col>
                                                        
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </Carousel.Item>

                                {/* NAF 2 */}
                                <Carousel.Item className="bg-persona_1">
                                    <div className="d-flex">
                                        <Container className="align-self-center text-white">
                                            <Row>
                                                <Col
                                                    md={{
                                                        span: 10,
                                                        offset: 1,
                                                    }}
                                                    className="pb-5"
                                                >
                                                    <Row
                                                        className="py-2"
                                                    >
                                                    </Row>
													<div className="pb-2">
													<h1 className="text-center mb-1">
															NORTH AMERICAN FARM
														</h1>
														<h3 className="text-center agi-header-normal mb-1" style={{fontSize: '1.25rem'}}>
															Story Flows
														</h3>
													</div>
                                                		
                                                    <Row>
													<Col lg={{
                                                            span: 4,
                                                            offset: 2
                                                        }}>
                                                            {/* <Image
                                                                style={{maxWidth: '100%'}}
                                                                className="vidyard-player-embed"
                                                                src="https://play.vidyard.com/LwD3Mhc5FcC8tbWzXfjRNb.jpg"
                                                                data-uuid="LwD3Mhc5FcC8tbWzXfjRNb"
                                                                data-v="4"
                                                                data-type="lightbox"
                                                            /> */}
															<Image
                                                                src={PLACEHOLDER}
                                                                fluid>
                                                            </Image>
                                                            <p className="text-center salesforce-sans-bolditalic mt-2">Vignette 3</p>
                                                        </Col>
                                                        <Col lg={4}>
                                                            {/* <Image
                                                                style={{maxWidth: '100%'}}
                                                                className="vidyard-player-embed"
                                                                src="https://play.vidyard.com/LwD3Mhc5FcC8tbWzXfjRNb.jpg"
                                                                data-uuid="LwD3Mhc5FcC8tbWzXfjRNb"
                                                                data-v="4"
                                                                data-type="lightbox"
                                                            /> */}
															<Image
                                                                src={PLACEHOLDER}
                                                                fluid>
                                                            </Image>
                                                            <p className="text-center salesforce-sans-bolditalic mt-2">Vignette 4</p>
                                                        </Col>
                                                        
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </Carousel.Item>

                               {/* ST 1 */}
							   <Carousel.Item className="bg-persona_1">
                                    <div className="d-flex">
                                        <Container className="align-self-center text-white">
                                            <Row>
                                                <Col
                                                    md={{
                                                        span: 10,
                                                        offset: 1,
                                                    }}
                                                    className="pb-5"
                                                >
                                                    <Row
                                                        className="py-2"
                                                    >
                                                    </Row>
													<div className="pb-2">
													<h1 className="text-center mb-1">
															GROWING SURETRACK
														</h1>
														<h3 className="text-center agi-header-normal mb-1" style={{fontSize: '1.25rem'}}>
															Story Flows
														</h3>
													</div>
                                                		
                                                    <Row>
                                                        <Col lg={4}>
                                                            {/* <Image
                                                                style={{maxWidth: '100%'}}
                                                                className="vidyard-player-embed"
                                                                src="https://play.vidyard.com/LwD3Mhc5FcC8tbWzXfjRNb.jpg"
                                                                data-uuid="LwD3Mhc5FcC8tbWzXfjRNb"
                                                                data-v="4"
                                                                data-type="lightbox"
                                                            /> */}
															<Image
                                                                src={PLACEHOLDER}
                                                                fluid>
                                                            </Image>
                                                            <p className="text-center salesforce-sans-bolditalic mt-2">Vignette 1</p>
                                                        </Col>
                                                        <Col lg={4}>
                                                            {/* <Image
                                                                style={{maxWidth: '100%'}}
                                                                className="vidyard-player-embed"
                                                                src="https://play.vidyard.com/LwD3Mhc5FcC8tbWzXfjRNb.jpg"
                                                                data-uuid="LwD3Mhc5FcC8tbWzXfjRNb"
                                                                data-v="4"
                                                                data-type="lightbox"
                                                            /> */}
															<Image
                                                                src={PLACEHOLDER}
                                                                fluid>
                                                            </Image>
                                                            <p className="text-center salesforce-sans-bolditalic mt-2">Vignette 2</p>
                                                        </Col>
                                                        <Col lg={4}>
                                                            {/* <Image
                                                                style={{maxWidth: '100%'}}
                                                                className="vidyard-player-embed"
                                                                src="https://play.vidyard.com/LwD3Mhc5FcC8tbWzXfjRNb.jpg"
                                                                data-uuid="LwD3Mhc5FcC8tbWzXfjRNb"
                                                                data-v="4"
                                                                data-type="lightbox"
                                                            /> */}
															<Image
                                                                src={PLACEHOLDER}
                                                                fluid>
                                                            </Image>
                                                            <p className="text-center salesforce-sans-bolditalic mt-2">Vignette 3</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </Carousel.Item> 

								{/* COM 1 */}
                                <Carousel.Item className="bg-persona_1">
                                    <div className="d-flex">
                                        <Container className="align-self-center text-white">
                                            <Row>
                                                <Col
                                                    md={{
                                                        span: 10,
                                                        offset: 1,
                                                    }}
                                                    className="pb-5"
                                                >
                                                    <Row
                                                        className="py-2"
                                                    >
                                                    </Row>
													<div className="pb-2">
													<h1 className="text-center mb-1">
															COMMERCIAL SALES
														</h1>
														<h3 className="text-center agi-header-normal mb-1" style={{fontSize: '1.25rem'}}>
															Story Flows
														</h3>
													</div>
                                                		
                                                    <Row>
													<Col lg={{
                                                            span: 4,
                                                            offset: 2
                                                        }}>
                                                            {/* <Image
                                                                style={{maxWidth: '100%'}}
                                                                className="vidyard-player-embed"
                                                                src="https://play.vidyard.com/LwD3Mhc5FcC8tbWzXfjRNb.jpg"
                                                                data-uuid="LwD3Mhc5FcC8tbWzXfjRNb"
                                                                data-v="4"
                                                                data-type="lightbox"
                                                            /> */}
															<Image
                                                                src={PLACEHOLDER}
                                                                fluid>
                                                            </Image>
                                                            <p className="text-center salesforce-sans-bolditalic mt-2">Vignette 1</p>
                                                        </Col>
                                                        <Col lg={4}>
                                                            {/* <Image
                                                                style={{maxWidth: '100%'}}
                                                                className="vidyard-player-embed"
                                                                src="https://play.vidyard.com/LwD3Mhc5FcC8tbWzXfjRNb.jpg"
                                                                data-uuid="LwD3Mhc5FcC8tbWzXfjRNb"
                                                                data-v="4"
                                                                data-type="lightbox"
                                                            /> */}
															<Image
                                                                src={PLACEHOLDER}
                                                                fluid>
                                                            </Image>
                                                            <p className="text-center salesforce-sans-bolditalic mt-2">Vignette 2</p>
                                                        </Col>
                                                        
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </Carousel.Item>

								{/* AA 1 */}
                                <Carousel.Item className="bg-persona_1">
                                    <div className="d-flex">
                                        <Container className="align-self-center text-white">
                                            <Row>
                                                <Col
                                                    md={{
                                                        span: 10,
                                                        offset: 1,
                                                    }}
                                                    className="pb-5"
                                                >
                                                    <Row
                                                        className="py-2"
                                                    >
                                                    </Row>
													<div className="pb-2">
													<h1 className="text-center mb-1">
															AMPLIFYING ACQUISITIONS
														</h1>
														<h3 className="text-center agi-header-normal mb-1" style={{fontSize: '1.25rem'}}>
															Story Flows
														</h3>
													</div>
                                                		
                                                    <Row>
													<Col lg={{
                                                            span: 4,
                                                            offset: 2
                                                        }}>
                                                            {/* <Image
                                                                style={{maxWidth: '100%'}}
                                                                className="vidyard-player-embed"
                                                                src="https://play.vidyard.com/LwD3Mhc5FcC8tbWzXfjRNb.jpg"
                                                                data-uuid="LwD3Mhc5FcC8tbWzXfjRNb"
                                                                data-v="4"
                                                                data-type="lightbox"
                                                            /> */}
															<Image
                                                                src={PLACEHOLDER}
                                                                fluid>
                                                            </Image>
                                                            <p className="text-center salesforce-sans-bolditalic mt-2">Vignette 1</p>
                                                        </Col>
                                                        <Col lg={4}>
                                                            {/* <Image
                                                                style={{maxWidth: '100%'}}
                                                                className="vidyard-player-embed"
                                                                src="https://play.vidyard.com/LwD3Mhc5FcC8tbWzXfjRNb.jpg"
                                                                data-uuid="LwD3Mhc5FcC8tbWzXfjRNb"
                                                                data-v="4"
                                                                data-type="lightbox"
                                                            /> */}
															<Image
                                                                src={PLACEHOLDER}
                                                                fluid>
                                                            </Image>
                                                            <p className="text-center salesforce-sans-bolditalic mt-2">Vignette 2</p>
                                                        </Col>
                                                        
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </Carousel.Item>


                            </Carousel>
                        </Container>
                    </Col>
                </Row>

					{/* RESOURCE CENTER */}
					{/* <Row id="resources">
						<Col className="bg-white py-5">
							<Container>
								<Row>
									<Col>
										<h1 className="agi-black-italic text-black text-center mb-4">
											RESOURCE CENTER
										</h1>
									</Col>
								</Row>

								<CardColumns>
									<Card className="my-3">
										<Card.Header>
											<h5 className="agi-header-normal text-center mb-0">
												Manufacturing Resources
											</h5>
										</Card.Header>
										<Card.Body className="py-0">
											<ListGroup variant="flush">
												<ListGroup.Item>
													<Image
														src="/assets/images/icons/html.svg"
														className="icon-type mr-3"
														alt="HTML"
													/>
													<a
														href="https://www.salesforce.com/resources/guides/2020-retail-holiday-guide/"
														target="_blank"
														rel="noopener noreferrer"
													>
														Holiday Retail Strategy &amp; Planning Guide
													</a>
													<FontAwesomeIcon
														icon={faExternalLinkAlt}
														size="sm"
														className="ml-3 text-grey"
													/>
													<span className="ml-2 text-grey text-smaller">
														Salesforce.com
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<Image
														src="/assets/images/icons/html.svg"
														className="icon-type mr-3"
														alt="HTML"
													/>
													<a
														href="https://www.salesforce.com/form/conf/customer-360-playbook/"
														target="_blank"
														rel="noopener noreferrer"
													>
														Customer 360 Playbook
													</a>
													<FontAwesomeIcon
														icon={faExternalLinkAlt}
														size="sm"
														className="ml-3 text-grey"
													/>
													<span className="ml-2 text-grey text-smaller">
														Salesforce.com
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<Image
														src="/assets/images/icons/html.svg"
														className="icon-type mr-3"
														alt="HTML"
													/>
													<a
														href="https://equalitydata.herokuapp.com/"
														target="_blank"
														rel="noopener noreferrer"
													>
														Equality Score Card
													</a>
													<FontAwesomeIcon
														icon={faExternalLinkAlt}
														size="sm"
														className="ml-3 text-grey"
													/>
													<span className="ml-2 text-grey text-smaller">
														Heroku
													</span>
												</ListGroup.Item>
											</ListGroup>
										</Card.Body>
									</Card>
									<Card className="my-3">
										<Card.Header>
											<h5 className="agi-header-normal text-center mb-0">
												Relevant Trails
											</h5>
										</Card.Header>
										<Card.Body className="py-0">
											<ListGroup variant="flush">
											<ListGroup.Item>
													<Image
														src="/assets/images/icons/trailhead.svg"
														className="icon-type mr-3"
														alt="Trailhead"
													/>
													<a
														href="https://trailhead.salesforce.com/en/content/learn/trails/champion_workplace_equality"
														target="_blank"
														rel="noopener noreferrer"
													>
														Equality at Work Trailmix via Trailhead
													</a>
													<FontAwesomeIcon
														icon={faExternalLinkAlt}
														size="sm"
														className="ml-3 text-grey"
													/>
													<span className="ml-2 text-grey text-smaller">
														Trailhead
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<Image
														src="/assets/images/icons/trailhead.svg"
														className="icon-type mr-3"
														alt="Trailhead"
													/>
													<a
														href="https://trailhead.salesforce.com/en/content/learn/modules/civic-engagement-in-the-united-states-public"
														target="_blank"
														rel="noopener noreferrer"
													>
														Civic Engagement in the US
													</a>
													<FontAwesomeIcon
														icon={faExternalLinkAlt}
														size="sm"
														className="ml-3 text-grey"
													/>
													<span className="ml-2 text-grey text-smaller">
														Trailhead
													</span>
												</ListGroup.Item>
											</ListGroup>
										</Card.Body>
									</Card>
									<Card className="my-3">
										<Card.Header>
											<h5 className="agi-header-normal text-center mb-0">
												Future Vision Resources
											</h5>
										</Card.Header>
										<Card.Body className="py-0">
											<ListGroup variant="flush">
												<ListGroup.Item>
													<Image
														src="/assets/images/icons/video.svg"
														className="icon-type mr-3"
														alt="Video"
													/>
													<a
														href="https://salesforce.vidyard.com/watch/9xnfogw1bqypjwCdbEhgPR"
														target="_blank"
														rel="noopener noreferrer"
													>
														Vision Video
													</a>
													<FontAwesomeIcon
														icon={faExternalLinkAlt}
														size="sm"
														className="ml-3 text-grey"
													/>
													<span className="ml-2 text-grey text-smaller">
														Vidyard
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<Image
														src="/assets/images/icons/ppt.svg"
														className="icon-type mr-3"
														alt="Powerpoint"
													/>
													<a
														href="https://org62.my.salesforce.com/sfc/p/000000000062/a/3y000000GCVQ/nJ6P93SA_FBCFMB2sq8t4QFZtZK.pi77hQvvuAnIBKM"
														target="_blank"
														rel="noopener noreferrer"
													>
														Vision Deck
													</a>
													<FontAwesomeIcon
														icon={faExternalLinkAlt}
														size="sm"
														className="ml-3 text-grey"
													/>
													<span className="ml-2 text-grey text-smaller">
														Salesforce.com
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<Image
														src="/assets/images/icons/image.svg"
														className="icon-type mr-3"
														alt="Image"
													/>
													<a
														href="https://org62.my.salesforce.com/sfc/p/000000000062/a/3y000000GCwW/bZ9vu9uj4wjyYESa1IdsqY6Fo8_GoFoPaywC0LQn78U"
														target="_blank"
														rel="noopener noreferrer"
													>
														Guest 360
													</a>
													<FontAwesomeIcon
														icon={faExternalLinkAlt}
														size="sm"
														className="ml-3 text-grey"
													/>
													<span className="ml-2 text-grey text-smaller">
														Salesforce.com
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<Image
														src="/assets/images/icons/image.svg"
														className="icon-type mr-3"
														alt="Image"
													/>
													<a
														href="https://org62.my.salesforce.com/sfc/p/000000000062/a/3y000000GCwb/CesQ.IOiVfNyM6rmkuoHa3JVHfRuD9nqEP66aoTvxt0"
														target="_blank"
														rel="noopener noreferrer"
													>
														Journey Map
													</a>
													<FontAwesomeIcon
														icon={faExternalLinkAlt}
														size="sm"
														className="ml-3 text-grey"
													/>
													<span className="ml-2 text-grey text-smaller">
														Salesforce.com
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<Image
														src="/assets/images/icons/video.svg"
														className="icon-type mr-3"
														alt="Video"
													/>
													<a
														href="https://salesforce.vidyard.com/watch/xQmLFjh64zGrj3q3smRx7j"
														target="_blank"
														rel="noopener noreferrer"
													>
														Future Vision Story Recording
													</a>
													<FontAwesomeIcon
														icon={faExternalLinkAlt}
														size="sm"
														className="ml-3 text-grey"
													/>
													<span className="ml-2 text-grey text-smaller">
														Vidyard
													</span>
												</ListGroup.Item>
											</ListGroup>
										</Card.Body>
									</Card>
								</CardColumns>
							</Container>
						</Col>
					</Row> */}
							

				</Container>

				{/* FOOTER */}
				<Footer />
            	</>
				/* <footer
					id="footer"
					className="text-center text-light mt-auto"
				>
					<Container className="footer-content bg-agi-green  py-5" fluid>
						<Row>
							<Col>
								Built by Canada Solutions on{" "}
								<span className="salesforcedisclaimer"></span>
							</Col>
						</Row>
					</Container>
				</footer>
			</> */
		);
	}
}
