console.log("index is connected");

function loadCategory(){
    //1- fetch data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2-convert promise to json
    .then((res) => res.json())
    // 3-send data to display category
    .then((data) => displayCategories(data.categories));
}

function removeActiveClass(){
  const activeButtons = document.getElementsByClassName("active");
  for(let btn of activeButtons){
    btn.classList.remove("active");
  }
}

function loadVideos(){
    fetch(" https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos)
    });
}

function displayCategories(categories){
    // get the container
  const categoryContainer = document.getElementById("category-container");
    // Loop operation on Array of object
for(let cat of categories){
    // console.log(cat);
    // create Element 
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML =`
    <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>`
    // Append the Element
    categoryContainer.appendChild(categoryDiv);
}
    
}

const loadCategoryVideos = (id) => {

 const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
 console.log(url);

 fetch(url)
 .then((res) => res.json())
 .then((data) => {
   removeActiveClass();
   const clickedButton = document.getElementById(`btn-${id}`);
   clickedButton.classList.add("active");
   console.log(clickedButton);
  displayVideos(data.category)
  
 });
}
const loadVideoDetails = (videoId) => {
  console.log(videoId);
  const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayVideoDetails(data.video));
}

const displayVideoDetails = (video) => {
  console.log(video);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2>${video.title} </h2>
    <div class="py-5 flex gap-3 px-0">
              <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div class="intro">
                <h2 class="text-sm font-semibold">${video.title}</h2>
                <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
                <p class="text-sm text-gray-400">${video.others.views} views</p>
              </div>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
  `
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
 videoContainer.innerHTML = "";
   if(videos.length == 0){
    videoContainer.innerHTML = `
    <div class=" py-20 col-span-full flex flex-col justify-center items-center text-center">
            <img class="w-[120px]" src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
    `
    return;
   }

  videos.forEach((video) => {
   
    const videoCard = document.createElement("div");
    
    videoCard.innerHTML = `
   <div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[220px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white bg-black px-2 text-sm rounded-sm">3hrs 56 min ago</span>
            </figure>
            
            <div class="py-5 flex gap-3 px-0">
              <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div class="intro">
                <h2 class="text-sm font-semibold">${video.title}</h2>
                <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
                <p class="text-sm text-gray-400">${video.others.views} views</p>
              </div>
            </div>
            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
          </div>
    `;

    videoContainer.appendChild(videoCard);
  });
}

loadCategory();
