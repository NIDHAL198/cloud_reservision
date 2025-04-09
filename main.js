function topicsApp() {
   return {
      topics: [
         { name: "Cloud Security Best Practices", category: "Security", reserved: true, reservedBy: "NIDHAL,SAMADOU,BADRO" },
         { name: "Containers and Docker", category: "Platform", reserved: true, reservedBy: "HAMZA,RAOUF" },
         { name: "Machine Learning  and Cloud", category: "Software", reserved: true, reservedBy: "HIBA , BESMALA,HADHER,SELMA,SARA,NOURHANE" },
         { name: "Big Data ", category: "Software", reserved: true, reservedBy: "MERIEM,AYA,CHAIMA,DOUAA" },
         { name: "Vmware vs mega", category: "Architecture", reserved: true, reservedBy: "HADJER , RIDA" },
         { name: "Cloud Computing Fundamentals", category: "Infrastructure", reserved: false, reservedBy: null },
         { name: "Infrastructure as a Service (IaaS)", category: "Infrastructure", reserved: false, reservedBy: null },
         { name: "Platform as a Service (PaaS)", category: "Platform", reserved: false, reservedBy: null },
         { name: "Software as a Service (SaaS)", category: "Software", reserved: false, reservedBy: null  },
         { name: "Serverless Computing", category: "Architecture", reserved: false, reservedBy: null },
         { name: "Microservices Architecture", category: "Architecture", reserved: false, reservedBy: null },
         { name: "Multi-Cloud Strategies", category: "Architecture", reserved: false, reservedBy: null },
         { name: "Edge Computing", category: "Infrastructure", reserved: false, reservedBy: null },
         { name: "Cloud Migration Strategies", category: "Architecture", reserved: false, reservedBy: null },
         { name: "DevOps in Cloud Environments", category: "Platform", reserved: false, reservedBy: null },
         { name: "Blockchain in Cloud Computing", category: "Platform", reserved: false, reservedBy: null },
         { name: "AI and Machine Learning Services", category: "Software", reserved: false, reservedBy: null },
         { name: "IoT and Cloud Integration", category: "Architecture", reserved: false, reservedBy: null },
         { name: "Cloud Cost Optimization", category: "Infrastructure", reserved: false, reservedBy: null },
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