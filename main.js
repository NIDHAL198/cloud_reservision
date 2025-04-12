function topicsApp() {
   return {
      topics: [
         { name: "Cloud Security Best Practices", category: "Security", reserved: true, reservedBy: "NIDHAL,SAMADOU,BADRO" },
         { name: "Containers and Docker", category: "Platform", reserved: true, reservedBy: "HAMZA,RAOUF" },
         { name: "Machine Learning  and Cloud", category: "Software", reserved: true, reservedBy: "HIBA , BESMALA,HADHER,SELMA,SARA,NOURHANE" },
         { name: "Big Data ", category: "Software", reserved: true, reservedBy: "MERIEM,AYA,CHAIMA,DOUAA" },
         { name: "Vmware vs mega", category: "Architecture", reserved: true, reservedBy: "HADJER , RIDA" },
         { name: "Serverless Computing", category: "Architecture", reserved: true, reservedBy: "WISSAK,ARIDJ" },
         { name: "Cloud Cost Optimization", category: "Infrastructure", reserved: true, reservedBy: "BESSMALA,NOUR,AYA" },
         { name: "Microservices Architecture", category: "Architecture", reserved: true, reservedBy: "ALIM,MOHAMED,YOUNES" },
         { name: "Cloud Computing Fundamentals", category: "Infrastructure", reserved: true, reservedBy: "FATHI,AKRAM,SELIMAN,AMINE,NOUR,MOHAMED" },
         { name: "Infrastructure as a Service (IaaS)", category: "Infrastructure", reserved: false, reservedBy: null },
         { name: "Platform as a Service (PaaS)", category: "Platform", reserved: false, reservedBy: null },
         { name: "Software as a Service (SaaS)", category: "Software", reserved: false, reservedBy: null  },
         { name: "Multi-Cloud Strategies", category: "Architecture", reserved: false, reservedBy: null },
         { name: "Edge Computing", category: "Infrastructure", reserved: false, reservedBy: null },
         { name: "Cloud Migration Strategies", category: "Architecture", reserved: false, reservedBy: null },
         { name: "DevOps in Cloud Environments", category: "Platform", reserved: false, reservedBy: null },
         { name: "Blockchain in Cloud Computing", category: "Platform", reserved: false, reservedBy: null },
         { name: "AI and Machine Learning Services", category: "Software", reserved: false, reservedBy: null },
         { name: "IoT and Cloud Integration", category: "Architecture", reserved: false, reservedBy: null },
         { name: "Disaster Recovery in Cloud", category: "Security", reserved: false, reservedBy: null },
         { name: "Hybrid Cloud Solutions", category: "Architecture", reserved: false, reservedBy: null }
         ],
         filteredTopics: [],
         searchQuery: "",
         filterStatus: "all",
         showModal: false,
         selectedTopicIndex: null,
         selectedTopic: null,
         studentName: "",
         
         init() {
            this.filteredTopics = [...this.topics];
            
            // Apply animations to table rows on load
            setTimeout(() => {
               const rows = document.querySelectorAll('tbody tr');
               rows.forEach((row, index) => {
                     row.classList.add('animate__animated', 'animate__fadeInUp');
                     row.style.animationDelay = `${index * 0.05}s`;
               });
            }, 300);
         },
            // New properties for the presenter wheel
      reservedTopicsForWheel: [],
      isSpinning: false,
      selectedPresenter: null,
      spinDuration: 5000, // 5 seconds
      
      init() {
         this.filteredTopics = [...this.topics];
         // Get only reserved topics for the wheel
         this.updateReservedTopicsForWheel();
         
         // Apply animations to table rows on load
         setTimeout(() => {
            const rows = document.querySelectorAll('tbody tr');
            rows.forEach((row, index) => {
                  row.classList.add('animate__animated', 'animate__fadeInUp');
                  row.style.animationDelay = `${index * 0.05}s`;
            });
         }, 300);
      },
      
      // Update the list of reserved topics for the wheel
      updateReservedTopicsForWheel() {
         this.reservedTopicsForWheel = this.topics.filter(topic => topic.reserved);
      },
      
      
      // Spin the presenter wheel
      spinPresenterWheel() {
         if (this.isSpinning || this.reservedTopicsForWheel.length === 0) return;
         
         this.isSpinning = true;
         this.selectedPresenter = null;
         
         // Calculate a random rotation between 5-10 full rotations plus a random angle
         const minRotations = 5;
         const maxRotations = 10;
         const randomRotations = minRotations + Math.random() * (maxRotations - minRotations);
         const randomAngle = Math.floor(Math.random() * 360);
         const totalRotation = (randomRotations * 360) + randomAngle;
         
         // Get the wheel element and apply rotation
         const wheel = this.$refs.presenterWheel;
         wheel.style.transform = `rotate(${totalRotation}deg)`;
         
         // After spinning is complete, determine the selected topic
         setTimeout(() => {
            // Calculate which topic was selected based on final rotation
            const normalizedRotation = totalRotation % 360;
            const sliceAngle = 360 / this.reservedTopicsForWheel.length;
            const selectedIndex = Math.floor(normalizedRotation / sliceAngle);
            const adjustedIndex = (this.reservedTopicsForWheel.length - selectedIndex) % this.reservedTopicsForWheel.length;
            
            this.selectedPresenter = this.reservedTopicsForWheel[adjustedIndex];
            this.isSpinning = false;
            
            // Add confetti effect for the winner
            this.celebrateWinner();
         }, this.spinDuration);
      },
      
      // Celebrate the selected presenter with a confetti effect
      celebrateWinner() {
         // Basic confetti effect - you can expand this if you want
         // Create and append confetti elements to the DOM
         const confettiCount = 100;
         const container = document.createElement('div');
         container.className = 'fixed inset-0 pointer-events-none z-50';
         document.body.appendChild(container);
         
         for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const color = Math.floor(Math.random() * 360);
            const left = Math.random() * 100;
            const size = Math.random() * 10 + 5;
            
            confetti.className = 'absolute animate__animated animate__fadeInUp animate__fadeOutDown';
            confetti.style.cssText = `
               left: ${left}%;
               top: -5%;
               width: ${size}px;
               height: ${size}px;
               background-color: hsl(${color}, 70%, 60%);
               border-radius: 50%;
               animation-duration: ${Math.random() * 2 + 2}s;
               animation-delay: ${Math.random() * 0.5}s;
            `;
            
            container.appendChild(confetti);
         }
         
         // Remove confetti after 4 seconds
         setTimeout(() => {
            document.body.removeChild(container);
         }, 4000);
      },
         filterTopics() {
            const query = this.searchQuery.toLowerCase();
            this.filteredTopics = this.topics.filter(topic => {
               const matchesSearch = topic.name.toLowerCase().includes(query) || 
                                    topic.category.toLowerCase().includes(query) ||
                                    (topic.reservedBy && topic.reservedBy.toLowerCase().includes(query));
               
               const matchesFilter = 
                     this.filterStatus === "all" || 
                     (this.filterStatus === "available" && !topic.reserved) ||
                     (this.filterStatus === "reserved" && topic.reserved);
               
               return matchesSearch && matchesFilter;
            });
         },
         
         reserveTopic(index) {
            this.selectedTopicIndex = index;
            this.selectedTopic = this.filteredTopics[index];
            this.showModal = true;
         },
         
         confirmReservation() {
            if (this.studentName.trim() === "") return;
            
            // Find the actual topic in the original array
            const topicIndex = this.topics.findIndex(t => t.name === this.selectedTopic.name);
            
            // Update the original topic
            this.topics[topicIndex].reserved = true;
            this.topics[topicIndex].reservedBy = this.studentName;
            
            // Update the filtered topic (current view)
            this.filteredTopics[this.selectedTopicIndex].reserved = true;
            this.filteredTopics[this.selectedTopicIndex].reservedBy = this.studentName;
            
            // Show success notification
            this.showNotification(`You've successfully reserved "${this.selectedTopic.name}"!`);
            
            // Close modal and reset form
            this.showModal = false;
            this.studentName = "";
         },
         
         showNotification(message) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg animate__animated animate__fadeInUp';
            notification.textContent = message;
            
            // Add to DOM
            document.body.appendChild(notification);
            
            // Remove after 3 seconds
            setTimeout(() => {
               notification.classList.remove('animate__fadeInUp');
               notification.classList.add('animate__fadeOutDown');
               
               // Remove from DOM after animation completes
               setTimeout(() => {
                     document.body.removeChild(notification);
               }, 500);
            }, 3000);
         }
   };
}