# Photo Sensei: guard image integrity for publishing platform using Mina and o1js

<div align="center">
  <a href="https://github.com/moven0831/Photo-Sensei/tree/main/">
    <img src="https://github.com/moven0831/Photo-Sensei/assets/60170228/e4f372ba-b746-43e5-864d-ea6ca2f64398" alt="Photo-Sensei" width="160" height="160">
  </a>
</div>

Photo Sensei is a ZK auth package designed for images on publishing platforms, focused on ensuring image integrity by leveraging Mina Protocol.

> [!NOTE]
> Check the [`dev`](https://github.com/moven0831/Photo-Sensei/tree/dev) branch for further features and debugged demo\
> :flashlight: [Project Slides](https://www.canva.com/design/DAF3VKopFQc/1USkzc_Su2H8TehSfURd_Q/view?utm_content=DAF3VKopFQc&utm_campaign=designshare&utm_medium=link&utm_source=editor) | :tv: [Intro Video](https://youtu.be/-gEWSNs517U?si=ItHMj5BXEF1-zzdO)


### :pencil: Details
Photo Sensei aim to build a package for publishing platforms such as [Medium](https://medium.com/) and [Mirror](https://mirror.xyz/) to enhance content authenticity. With the help of sensei, content creators can generate ZKP and provide verification for redacted [C2PA-enabled](https://c2pa.org/) images in their articles. This open standard providing creators and viewers the ability to trace the origin of different types of media. That is, content viewers can ensure that the redacted images they view are derived from the original photo and that the metadata matches the original. This process guarantees image integrity while preventing any inference of new information from the redacted images and proofs. Therefore, if the redacted images are verified, viewers can be confident that what they are seeing has not been sourced from tampered material, such as unauthorized edited photos or deepfake creations.

### :star2: Goals
In this very first stage, our code achieved the following
1. Enabled any photo to generate ZKP for basic image transformations, such as grayscale.
2. Ensured that the digital signature of C2PA-enabled images remains verifiable even after image post-processing.
3. Made the generated ZKP verifiable on-chain, affirming the accuracy of image post-processing.

| ![Flow of Photo Sensei](https://github.com/moven0831/Photo-Sensei/assets/60170228/0c41d907-91c0-4258-b92a-7a8f6006767e) | 
|:--:| 
| *Expected flow of Photo Sensei* |

### :rocket: Roadmaps
Our roadmap will leverage more powerful crypto primitives includes
1. Support recursive verification for image edits after the initial proof generation.
2. Optimize the data type in `o1js` to better handle image data types, as currently, images of size 100x100 pixels can cause stack overflow in `o1js`.
3. Expand more set of image transformations such as resizing and mosaic.


### Get Started
1. use zkApp client to deploy contracts on `Berkeley` testnet
```sh
npm i
npm update -g zkapp-cli
zk config
zk deploy
```

2. Run the UI and interact with deployed contracts
```sh
npm i
npm run dev
```

| ![Flow of Photo Sensei](https://github.com/moven0831/Photo-Sensei/assets/60170228/8b2cc542-1e04-458c-92d6-e8ed483fc538) | 
|:--:| 
| *Overall structure and Roadmap* |
