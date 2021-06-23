import React, { Component } from "react";
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
} from "react-bootstrap";
import { jarallax, jarallaxVideo } from "jarallax";
import VidyardEmbed from "@vidyard/embed-code";
import Lightbox from 'react-image-lightbox';
import Scrollspy from "react-scrollspy";
import {Animated} from "react-animated-css";
import ScrollAnimation from "react-animate-on-scroll";

import "./Microsite.css";
import PLACEHOLDER from '../../images/placeholder.png';

jarallaxVideo();

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
		jarallax(document.querySelectorAll(".jarallax"));
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
								src="assets/images/combo-logo-60.jpg"
								id="logo"
								className="d-inline-block align-top"
								loading="lazy"
							></Image>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Scrollspy
								items={[
									"our-vision",
									"demos",
									"why-salesforce",
								]}
								currentClassName="active"
								componentTag="div"
								className="navbar-nav ml-auto"
							>
								<Nav.Link className="nav-scroll founders-grotesk-regular" href="#our-vision">
									CHALLENGE STATEMENT
								</Nav.Link>
								<Nav.Link className="nav-scroll founders-grotesk-regular" href="#our-vision">
									WIN THEMES
								</Nav.Link>
								<Nav.Link className="nav-scroll founders-grotesk-regular" href="#our-vision">
									EXPERIENCE DEMOS
								</Nav.Link>
								<Nav.Link className="nav-scroll founders-grotesk-regular" href="#our-vision">
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
								<Container className="my-5 py-3">
									<Row id="hero">
										<Col className="px-0">
											<Container fluid>
											<div className="d-flex">
												<Row>
													<Col xl={5}
														className="hero-left text-darkgrey text-left">
                                                        <h3 className="founders-grotesk-regular my-4">
														Flying the flag with <span className="text-sf">Salesforce</span>
														</h3>
														<h1 className="founders-grotesk-regular mb-4">
															Setting course for the <span className="text-red hero-emphasis">potential</span> of the Traveler 360
														</h1>
													</Col>
													<Col xl={7}>
													<Image
														style={{maxWidth: '100%'}}
														className="vidyard-player-embed"
														src="https://play.vidyard.com/LwD3Mhc5FcC8tbWzXfjRNb.jpg"
														data-uuid="LwD3Mhc5FcC8tbWzXfjRNb"
														data-v="4"
														data-type="lightbox"
													/>
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
					<Row id="intro" className="bg-light p-5">
						<Col className="px-0">
							<div>
								<Jumbotron
									fluid
									className="hero bg-light text-center mb-0"
								>
									<Container className="py-2">
										<Row>
											<Col>
												
												<Container fluid>
                            <Row className="align-items-center">
                                <Col lg={3}>
                                    <ScrollAnimation animateIn="slideInLeft" animateOnce>
                                        <Image
                                            src="/assets/images/ac-express.png"
                                            alt="Air Canada Express"
                                            className="p-2"
                                            style={{
                                                maxWidth: "200px"
                                            }}
                                        ></Image>
                                    </ScrollAnimation>
                                </Col>
                                <Col lg={6}>
								<h1 className="text-gold founders-grotesk-regular mb-4">
													Challenge Statement
												</h1>
                                    <p className="lead px-2">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
									sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
									Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </Col>
                                <Col lg={3}>
                                <ScrollAnimation animateIn="slideInRight" animateOnce>
                                        <Image
                                            src="/assets/images/ac-airbus.png"
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
                    <Row id="titles" className="p-1 bg-light">
                        <Col>
                        <Jumbotron
									fluid
									className="hero bg-light text-center mb-0"
								>
                                    <h1 className="text-gold founders-grotesk-regular mb-4">
                                        Win Themes
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
															Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
															eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                                            </Card.Body>
                                                        </Animated>
                                                    </Card>
                                            </Col>
                                            <Col md={4}
                                                className="px-0">
                                                <Card className="tile_container tile-container_2 m-2" onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                                                    <Animated animationIn="fadeIn" animationInDuration={800} isVisible={true} className="tile-overlay">
                                                        <Card.Body className="h-100">
															Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
															eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                                        </Card.Body>
                                                    </Animated>
                                                </Card>
                                            </Col>
                                            <Col md={4}
                                                className="px-0">
                                                <Card className="tile_container tile-container_3 m-2"  onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                                                    <Animated animationIn="fadeIn" animationInDuration={800} isVisible={true} className="tile-overlay">
                                                        <Card.Body className="h-100">
															Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
															eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
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

					<Row id="wheel" className="p-1 bg-lightgrey">
                        <Col>
                        <Jumbotron
									fluid
									className="hero bg-lightgrey text-center mb-0"
								>
                        <Container>
                            <Row >
                                <Col className="px-0">
                                    <Container
                                        className="p-0"
                                        fluid>
                                        <Row className="align-items-center">
                                    <Col lg={6} className="customer-360_left order-2 order-lg-1">
                                        <Image
                                            src="/assets/images/Air-Canada-Wheel.png"
                                            alt="Air Canada Traveler 360"
                                            className="wheel-img p-3"
                                            fluid
                                        />
                                    </Col>
                                    <Col lg={6} className="customer-360_right order-1 order-lg-2 text-left">
                                        <h1 className="text-red px-5 mx-5"><span className="founders-grotesk-bold">Air Canada</span><br></br>Traveler 360</h1>
                                    </Col>
                                </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                        </Jumbotron>
                    </Col>
                    </Row>


				</Container>

				{/* FOOTER */}
				<footer
					id="footer"
					className="text-center text-light mt-auto"
				>
					<Container className="footer-content bg-darkblue py-5" fluid>
						<Row>
							<Col>
								Built by Q Branch on{" "}
								<span className="salesforcedisclaimer"></span>
							</Col>
						</Row>
					</Container>
				</footer>
			</>
		);
	}
}
