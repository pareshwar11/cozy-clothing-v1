import React from "react";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "./footerStyles";

const Footer = () => {
return (
	<Box>
	<h1 style={{ color: "green",
				textAlign: "center",
				marginTop: "-50px" }}>
		Cozy Clothing
	</h1>
	<Container>
		<Row>
		<Column>
			<Heading>About Us</Heading>
			<FooterLink href="#">Demo id/password</FooterLink>
			<FooterLink href="#">Vision</FooterLink>
			<FooterLink href="#">Motivation</FooterLink>
		</Column>
		<Column>
			<Heading>Mens</Heading>
			<FooterLink href="#">T-Shirt</FooterLink>
			<FooterLink href="#">Full-Shirt</FooterLink>
			<FooterLink href="#">Jackets</FooterLink>
			<FooterLink href="#">Jeans</FooterLink>
		</Column>
		<Column>
			<Heading>Womans</Heading>
			<FooterLink href="#">Jeans</FooterLink>
			<FooterLink href="#">T-Shirt</FooterLink>
			<FooterLink href="#">Indore</FooterLink>
			<FooterLink href="#">Mumbai</FooterLink>
		</Column>
        <Column>
			<Heading>Kids under 15</Heading>
			<FooterLink href="#">Jeans</FooterLink>
			<FooterLink href="#">T-Shirt</FooterLink>
			<FooterLink href="#">Shoes</FooterLink>
			<FooterLink href="#">Shirts</FooterLink>
		</Column>
		</Row>
	</Container>
	</Box>
);
};
export default Footer;
