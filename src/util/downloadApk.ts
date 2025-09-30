export const downloadLatestStandaloneApk = async (url: string): Promise<void> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch release data');
        }

        const data = await response.json();

        if (!Array.isArray(data.assets)) {
            throw new Error('No assets found in the release');
        }

        const standaloneAsset = data.assets.find((asset: any) =>
            /^wgtunnel-standalone-.*\.apk$/i.test(asset.name)
        );

        if (!standaloneAsset) {
            alert('No matching standalone APK found in the latest release.');
            return;
        }

        const downloadUrl: string = standaloneAsset.browser_download_url;

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = standaloneAsset.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading APK:', error);
        alert('An error occurred while trying to download the APK.');
    }
};