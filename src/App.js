import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import i1 from "./assets/images/mintkeeper.jpg";
import img1 from "./assets/images/jp1.png";
import img2 from "./assets/images/jp2.png";
import img3 from "./assets/images/jp3.png";
import img4 from "./assets/images/jp4.png";
import img5 from "./assets/images/jp5.png";
import img6 from "./assets/images/jp6.png";
import newbanner from "./assets/images/mintingbanner3.jpeg"

export const StyledButton = styled.button`
  border-radius: 50px;
  border: solid;
  background-color: #AE64E5;
  padding: 10px;
  text-align: center;
  text-shadow: 2px 2px 2px #000000;  
  padding-left: 40px;

  font-weight: bold;
  font-size: 40px;
  color: white;
  cursor: pointer;
  // box-shadow: 0px 6px 0px -2px black;
  // -webkit-box-shadow: 0px 6px 0px -2px black;
  // -moz-box-shadow: 0px 6px 0px -2px black;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    color: #white;
  }
  :hover {
    transition-duration: .4s;
    color: blue;
  }
  @media (min-width: 767px) {
    padding-left: 40px;
    border-color: black;
    text-shadow: 2px 2px 2px #000000;  
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledImg = styled.img`
  width: 403px;
  height: 176.5px;
  box-shadow:
  0 0 60px 30px #fff,  /* inner white */
  0 0 100px 60px #f0f, /* middle magenta */
  0 0 140px 90px #0ff; /* outer cyan */
  @media (min-width: 767px) {
    width: 806px;
    height: 337px;
    box-shadow:
    0 0 60px 30px #fff,  /* inner white */
    0 0 100px 60px #f0f, /* middle magenta */
    0 0 140px 90px #0ff; /* outer cyan */
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("");
  const [claimingNft, setClaimingNft] = useState(false);
  const claimNFTs = (_amount) => {
    _amount = document.getElementById("inputBox").value;
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your Official Jetpack Ape(s)...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      // ********
      // You can change the line above to
      // .whiteListMint(blockchain.account, _amount) if you want only whitelisted
      // users to be able to mint through your website!
      // And after you're done with whitelisted users buying from your website,
      // You can switch it back to .mint(blockchain.account, _amount).
      // ********
      .send({
        gasLimit: 285000 * _amount,
        to: "0xe5cf8e64d3666aed8b7E73Bf42Bc034390CfD7B0",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((0.035 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong. Check your transaction on Etherscan to find out what happened!");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "CONGRATS! Your Jetpack Ape(s) successfully minted!"
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen style={{ backgroundColor: "var(--black)", fontSize: 40 }}>
      <s.Container flex={1} ai={"center"} style={{ padding: 0, backgroundColor: "#1C0C4D", flexDirection: "column"}}>
        <div style={{
          display:"flex",
          textAlign: "left", 
          justifySelf: "left", 
          justifyContent: "left",
          }}>
        <s.TextTitle style={{}}>
        <a 
        style={{
          textAlign: "left", 
          justifySelf: "left", 
          justifyContent: "left",
          paddingLeft: 30,
          paddingTop: 30,
        }}
        
        href="https://opensea.io/"><StyledImg alt={"JetpackApe"} 
          src={newbanner} 
          style={{textAlign: "center", marginTop: 100,
          borderRadius: 30,
          borderStyle: "solid",
          borderWidth: 10,
          borderColor: "black"
          }}></StyledImg></a>
          </s.TextTitle>
          
        </div>
        <div style={{}}>
          <span style={{}}>
          <s.TextTitle
              style={{ 
              color: "white",
              textAlign: "center", 
              maxWidth: 500,
              fontSize: 50,
              marginTop: 150,
              paddingBottom: 0,
              marginBottom: 0,
              fontWeight: "bold", 
              borderStyle: "solid", 
              borderColor: "black",}}>
                  Mint your official <text style={{color: "#EAB0FD"}}>JetpackApe</text> today!
              </s.TextTitle>
              </span>
              </div>
        <ResponsiveWrapper flex={1} style={{ padding: 24, paddingTop: 0 }}>
          <s.Container flex={1} jc={"center"} ai={"center"} style={{paddingTop: 0}}>
          <s.TextTitle
              style={{ 
              color: "white",
              textAlign: "center", 
              maxWidth: 1000,
              fontSize: 30,
              paddingBottom: 0, 
              fontWeight: "bold", 
              borderStyle: "solid", 
              borderColor: "black",}}>
                  {/* A <text style={{color: "#94E8E8"}}>Cryptic Key</text> is an NFT that is high in utility and extremity rare.
                  These keys open arks which are digital treasure chests that have
                  physical and digital prizes. They also act as tickets to our
                  upcoming YouTube videos, podcasts, events and more. 
                  Each key is a 1 of 1 masterpiece, so get yours before 
                  they’re gone!<br/><text style={{color: "#94E8E8", fontSize: 40}}>999 keys are available for pre sale! </text> */}
                   <StyledImg alt={"img1"} src={img1} 
                        style={{
                          paddingTop: 0, 
                          // borderStyle: "solid", 
                          // borderColor: "black", 
                          // borderWidth: 3,
                          borderRadius: 0,
                          height: 235,
                          width: 195,
                          margin: "2px",
                          boxShadow: "none"
                           }}/>
                            <StyledImg alt={"img1"} src={img2} 
                        style={{
                          paddingTop: 0, 
                          // borderStyle: "solid", 
                          // borderColor: "black", 
                          // borderWidth: 3,
                          borderRadius: 0,
                          height: 235,
                          width: 195,
                          margin: "2px",
                          boxShadow: "none"
                           }}/>
                           <StyledImg alt={"img1"} src={img3} 
                        style={{
                          paddingTop: 0, 
                          // borderStyle: "solid", 
                          // borderColor: "black", 
                          // borderWidth: 3,
                          borderRadius: 0,
                          height: 235,
                          width: 195,
                          margin: "2px",
                          boxShadow: "none"
                           }}/>

              </s.TextTitle>
            {/* <a href="https://skulljunkiesnft.com/"><StyledImg alt={"Mintkeeper"} src={i1} style={{paddingTop: 0, borderStyle: "solid", borderColor: "black", borderWidth: 0,
                    borderRadius: 0 }}/></a> */}
                    <div>
            <s.Container
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{ 
              flexDirection: "column",
              backgroundColor: "#AE64E5", 
              padding: 24,
              paddingTop: 0,
              borderStyle: "solid", 
              borderColor: "black", 
              borderWidth: 10,
              borderRadius: 10,
              fontSize: 40,
              maxWidth: 400,
              marginTop: 0,
              maxHeight: 1500, }}
          >
            {Number(data.totalSupply) == 999 ? (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The sale has ended.
                </s.TextTitle>
                {/* <s.SpacerSmall /> */}
                <s.TextDescription style={{ textAlign: "center" }}>
                  Dont worry, you're not missing out! You can still get Cryptic Keys on{" "}
                  <a
                    // target={"_blank"}
                    href={"https://opensea.io/collection/cryptic-keys"}
                  >
                    Opensea.io
                  </a>
                </s.TextDescription>
              </>
            ) : (
              <>
                {/* <s.TextTitle style={{ textAlign: "center", fontSize: 30 }}>
                  1 DOODL costs .01 ETH.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription style={{ textAlign: "center", fontSize: 30 }}>
                  Excluding gas fees.
                </s.TextDescription>
                <s.SpacerSmall /> */}
                <s.TextDescription style={{ textAlign: "center", fontSize: 20, color: "white" }}>
                  {feedback}
                </s.TextDescription>
                {/* <s.SpacerMedium /> */}
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"} style={{
                  }}>
                    <StyledButton
                      style={{
                        fontFamily:"coder", 
                        borderWidth: 0,
                        borderStyle: "solid",
                        borderColor: "purple",
                        fontSize: 40,

                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription style={{ textAlign: "center", fontSize: 20}}>
                          <bold style={{color: "white"}}>{blockchain.errorMsg}</bold>
                        </s.TextDescription>
                      </>
                    ) : null}
                    <s.SpacerSmall/>
                      Mint Now
                    </StyledButton>
                    <s.SpacerLarge />
                    {/* <s.TextDescription style={{textAlign: "center", fontSize: 30, marginBottom: 0, paddingBottom: 0}}>
                      <a href="https://google.com">Boo Crew NFT Smart Contract</a>
                    </s.TextDescription> */}
                    {/* {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription style={{ textAlign: "center", fontSize: 20}}>
                          <bold style={{color: "white"}}>{blockchain.errorMsg}</bold>
                        </s.TextDescription>
                      </>
                    ) : null} */}
                  </s.Container>
                ) : (
                  <s.Container ai={"center"} jc={"center"} fd={"row"} style={{
                    marginTop: 0, 
                    paddingTop: 0,
                    color: "white"}}>
                    <form>
                    {/* I want  */}
                    <input 
                    id="inputBox"
                    placeholder="#" 
                    type="number" 
                    min="1" 
                    max="5"
                    style={{
                      
                      fontSize: 30,
                      textAlign: "center",
                      backgroundColor: "black",
                      color: "#AF64E5",
                      borderWidth: 4,
                      borderColor: "black",
                      borderStyle: "solid",
                      borderRadius: 100,
                      paddingRight: 10,
                      // marginBottom: 20,
                      // paddingLeft: 0,
                      // marginLeft: 0,
                      width: 100,
                      }}
                    /> 
                    {/* Skulljunkies! */}
                    </form>
                    <s.SpacerSmall/>
                    <StyledButton
                     style={{fontFamily: "'Roboto', sans-serif;", fontSize: 50, marginTop: 20, paddingRight: 40}}
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(1);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "MINT"}
                    </StyledButton>
                  </s.Container>
                )}
              </>
            )}
          </s.Container>
          <s.SpacerSmall/>
            {/* <s.TextTitle
              style={{ textAlign: "center", fontSize: 40, fontWeight: "bold", borderStyle: "solid", borderColor: "white", 
              borderWidth: 10,
              paddingLeft: 100,
              paddingRight: 100,
              borderRadius: 0,
              paddingBottom: 21,
              paddingTop: 22,
              marginTop: 18,
              marginBottom: 20,
              background: "black",
              color: "white",
              }}
            > 
              {blockchain.account == null ? "   ???" : ("   " + data.totalSupply)}/999 <br/>
              Keys Sold
            </s.TextTitle> */}
            </div>
            <s.TextTitle
              style={{ 
              color: "white",
              textAlign: "center", 
              maxWidth: 1000,
              fontSize: 30,
              paddingBottom: 0, 
              fontWeight: "bold", 
              borderStyle: "solid", 
              borderColor: "black",}}>
                  {/* A <text style={{color: "#94E8E8"}}>Cryptic Key</text> is an NFT that is high in utility and extremity rare.
                  These keys open arks which are digital treasure chests that have
                  physical and digital prizes. They also act as tickets to our
                  upcoming YouTube videos, podcasts, events and more. 
                  Each key is a 1 of 1 masterpiece, so get yours before 
                  they’re gone!<br/><text style={{color: "#94E8E8", fontSize: 40}}>999 keys are available for pre sale! </text> */}
                   <StyledImg alt={"img1"} src={img4} 
                        style={{
                          paddingTop: 0, 
                          // borderStyle: "solid", 
                          // borderColor: "black", 
                          // borderWidth: 3,
                          borderRadius: 0,
                          height: 235,
                          width: 195,
                          margin: "2px",
                          boxShadow: "none"
                           }}/>
                            <StyledImg alt={"img1"} src={img5} 
                        style={{
                          paddingTop: 0, 
                          // borderStyle: "solid", 
                          // borderColor: "black", 
                          // borderWidth: 3,
                          borderRadius: 0,
                          height: 235,
                          width: 195,
                          margin: "2px",
                          boxShadow: "none"
                           }}/>
                           <StyledImg alt={"img1"} src={img6} 
                        style={{
                          paddingTop: 0, 
                          // borderStyle: "solid", 
                          // borderColor: "black", 
                          // borderWidth: 3,
                          borderRadius: 0,
                          height: 235,
                          width: 195,
                          margin: "2px",
                          boxShadow: "none"
                           }}/>

              </s.TextTitle>
            
          {/* <s.TextTitle
              style={{ 
              color: "white",
              textAlign: "left",
              borderStyle: "solid",
              borderColor: "white",
              borderWidth: 5,
              borderRadius: 20,
              maxWidth: 600,
              fontSize: 70, 
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 30,
              lineHeight: .6,
              paddingBottom: 30
              }}>
                 <bold style={{color: "#ED1B76"}}>ROAD</bold> <bold style={{color: "#249F9C"}}>MAP </bold> 
                 <br/><br/>
                 <text style={{fontSize: 35}}>
                   <text style={{fontSize: 50, color: "#249F9C"}}>25%</text> - You are in debt, how will you pay your bills?
                   A mysterious man hands you a card with a phone number. Will you call it?
                   <text style={{fontSize: 35, color: "#249F9C"}}> 10 lucky holders will receive a player airdrop.</text>
                   <br/><br/>
                   <text style={{fontSize: 50, color: "#ED1B76"}}>50%</text> - The guards have been preparing for your arrival. You have no idea
                   what they have in store for you. 
                   <text style={{fontSize: 35, color: "#ED1B76"}}> 10 lucky holders recieve a guard airdrop.</text>
                   <br/><br/>
                   <text style={{fontSize: 50, color: "#02FF02"}}>100%</text> - The squid game begins! Which side are you on? The first
                   game will be revealed. Pick your side and stake either your player or guard.
                   <text style={{fontSize: 35, color: "#02FF02"}}>The winning team takes home the grand prize of 5% of the royalty revenue
                   split amongst 5 players/guards randomly.</text>
                 </text>
              </s.TextTitle>
              <s.TextTitle
              style={{ 
              color: "white",
              textAlign: "left",
              borderStyle: "solid",
              borderColor: "white",
              borderWidth: 5,
              borderRadius: 20,
              marginTop: 50,
              maxWidth: 600,
              fontSize: 70, 
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 30,
              lineHeight: .6,
              paddingBottom: 30
              }}>
                 <bold style={{color: "#ED1B76"}}>ROAD</bold> <bold style={{color: "#249F9C"}}>MAP </bold> <bold style={{color: "#ED1B76", fontSize: 40}}>Cont.</bold>
                 <br/><br/>
                 <text style={{fontSize: 35}}>
                 <text style={{fontSize: 35, color: "#02FF02"}}>Rarity Tools</text> - We will list the guards/players on rarity tools.
                   <br/><br/>
                   <text style={{fontSize: 35, color: "#02FF02"}}>Community Funds</text> - We will deposit 5% of weekly royalty 
                   revenue into a community wallet to be disbursed to the winners of the games.
                   <br/><br/>
                   <text style={{fontSize: 35, color: "#02FF02"}}>Additional Games</text> - After the first game has concluded,
                   will you continue playing and risking your life? There will be a total of 6 games. Pay your debts.
                   <br/><br/>
                   <text style={{fontSize: 35, color: "#02FF02"}}>Raffles/Airdrops</text> - Have a chance of getting free airdrops and participate in our raffles. You owe so much money.
                 </text>
              </s.TextTitle> */}
              {/* <s.TextTitle
              style={{ 
              color: "white",
              textAlign: "left",
              borderStyle: "solid",
              borderColor: "white",
              borderWidth: 5,
              borderRadius: 20,
              marginTop: 50,
              maxWidth: 600,
              fontSize: 70, 
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 30,
              lineHeight: .6,
              paddingBottom: 30
              }}>
                 <bold style={{color: "#ED1B76"}}>F</bold>.<bold style={{color: "#249F9C"}}>A</bold>.<bold style={{color: "#ED1B76"}}>Q</bold>.
                 <br/><br/>
                 <text style={{fontSize: 35}}>
                   We won't tell you all of the rules. That'll ruin the fun. But here are some directions
                   to get you to the squid games.
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     How can I get a <bold style={{color: "#ED1B76"}}>guard</bold> /<bold style={{color: "#249F9C"}}> player </bold>?</text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     How can I purchase a <bold style={{color: "#ED1B76"}}>guard</bold> /<bold style={{color: "#249F9C"}}> player </bold>?</text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     How many <bold style={{color: "#ED1B76"}}>guards</bold> /<bold style={{color: "#249F9C"}}> players </bold> can I purchase?</text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     When will my <bold style={{color: "#ED1B76"}}>guard</bold> /<bold style={{color: "#249F9C"}}> player </bold> be revealed?</text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   <text style={{fontSize: 50, color: "white"}}>
                     How do I know if I will get a <bold style={{color: "#ED1B76"}}>guard</bold> or a <bold style={{color: "#249F9C"}}> player </bold>?</text>
                   <br/>
                   lorem ipsum
                   <br/><br/>
                   
                   
                 </text>
              </s.TextTitle> */}
          </s.Container>
          {/* <s.SpacerMedium /> */}
          
        </ResponsiveWrapper>
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription style={{ textAlign: "center", fontSize: 40}}>
                      <a 
                      href="https://rinkeby.etherscan.io/address/0xe5cf8e64d3666aed8b7E73Bf42Bc034390CfD7B0"
                      style={{
                        textDecoration: "none",
                        color: "lightblue",
                        fontSize: 40,
                      }}
                      >JPA Smart Contract </a> <text style={{color: "white"}}></text>
          </s.TextDescription>
          
          {/* <s.TextDescription style={{ textAlign: "center", fontSize: 10, color: "white" }}>
            asdf
          </s.TextDescription> */}
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
