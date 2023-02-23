self.addEventListener('push', async function  (event) {
    const data =  await event?.data?.json();

    console.log(data);
    event.waitUntil(
        self.registration.showNotification(JSON.stringify(data))
    );
})