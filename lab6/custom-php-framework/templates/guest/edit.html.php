<?php

/** @var \App\Model\Guest $guest */
/** @var \App\Service\Router $router */

$title = "Edit Guest {$guest->getName()} ({$guest->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('guest-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="guest-edit">
        <input type="hidden" name="id" value="<?= $guest->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('guest-index') ?>">Back to list</a></li>
        <li>
            <form action="<?= $router->generatePath('guest-delete') ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="guest-delete">
                <input type="hidden" name="id" value="<?= $guest->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
